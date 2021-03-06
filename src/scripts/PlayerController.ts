import LogManager from "./LogManager";
import MatchView from "./MatchView";
import JoystickView from "./JoystickView";
import WebSocketClient from "../WebSocketClient";
import UserData, { PlayerStatus } from "../backup/UserData";

/**控制角色运动 */
// https://ldc.layabox.com/doc/?nav=zh-ts-4-1-1 //官方移动角色
export default class PlayerController extends Laya.Script3D {
    private gameObject: Laya.Sprite3D;
    private animator: Laya.Animator;
    private avatarID: string = ""; //MatchView传进来
    public get isLocalPlayer() { //只有自己的角色，可以输出操作
        return (this.avatarID == UserData.getInstance().uid);
    }
    public currentHP: number = 300;
    public isDead: boolean = false; //角色死亡
    private direction: number = 1;

    private myFingerIndex: number = -1; //控制摇杆的手指
    private _clickTime: number; //限制点击次数
    private touchEvent: Laya.Event;
    
    private motions: Array<string> = [
        "Unarmed-Idle",             //待机0
        "Unarmed-Strafe-Forward",   //前进1
        "Unarmed-Strafe-Backward",  //后退2
        "Unarmed-Jump",             //跳跃3
        "Unarmed-Land",             //着陆4
        "Unarmed-Attack-L1",        //重拳5 //距离2.5以内//伤害10
        "Unarmed-Attack-L2",        //重拳6 //距离2.5以内//伤害15
        "Unarmed-Attack-L3",        //重拳7 //距离2.5以内//伤害20
        "Unarmed-Attack-Kick-L1",   //踢腿8 //距离2.0以内//伤害20，破防
        "Unarmed-Defend",           //防御9
        "Unarmed-GetHit-F1",        //受击10
        "Unarmed-Death1",           //死亡11
    ];
    private currentMotion = 0;
    private animLastTime: number = 0; //动画时长
    private posy: number = 0;
    private _posz: number = 0;
    public get posz() {
        return this._posz;
    }

    constructor() {
        super();
    }

    onEnable(): void {
        this.currentHP = 300;
        this.isDead = false;
        Laya.stage.on("nethandle", this, this.handle);
    }

    onUpdate(): void {
        if(this.avatarID == UserData.getInstance().uid //该角色是自己控制的
            && (this.currentMotion == 1 || this.currentMotion == 2)) //由摇杆控制的动画
        {
            var obj: Object = {
                "type": "cs_move",
                "uid": UserData.getInstance().uid,
                "movez": JoystickView.getInstance().Horizontal * -0.02
            };
            WebSocketClient.getInstance().sendData(obj);
        }
    }

    // 碰撞校验都由客户端完成，服务器只做分发
    private handle(obj): void {
        var isDriven: boolean = (obj.uid == this.avatarID); //模型受网络消息驱动
        switch(obj.type) {
            case "sc_fist": { //出拳
                if(isDriven) { //出拳方，播放动画
                    this.currentMotion = obj.motion;
                    console.log(this.avatarID + "出拳" + this.currentMotion);
                    this.animator.play(this.motions[this.currentMotion]);
                    Laya.timer.once(obj.waitTime, this, this.playIdle);
                } else { //挨打方
                    if(obj.broken == 1) {
                        console.log(obj.uid, "被破防了");
                    }

                    if(obj.damage == 0) {
                        console.log(obj.uid, "防御了，在他边上创建防御特效");
                        //TODO:
                    } else if (obj.damage > 0) {
                        if(this.isDead) {
                            console.log(obj.beaten + "已死亡，无效攻击");
                            return;
                        }
                        console.log(obj.beaten + "挨打(-" + obj.damage + ")");
                        this.currentHP -= obj.damage;

                        if(this.currentHP <= 0) { //死亡
                            this.currentHP = 0;
                            this.isDead = true;
                            console.log("========> 最后一拳打死");

                            Laya.timer.clearAll(this); //不再播待机了
                            Laya.timer.once(400, this, function() { // 等拳打到了再播
                                this.currentMotion = 11;
                                this.animator.play(this.motions[this.currentMotion]);
                                MatchView.getInstance().updateHP(this, obj.damage);
                            });
                        } else { // 受击
                            Laya.timer.once(400, this, function() { // 等拳打到了再播
                                this.currentMotion = 10;
                                this.animator.play(this.motions[this.currentMotion]);
                                MatchView.getInstance().updateHP(this, obj.damage);

                                // 挨打完恢复待机
                                Laya.timer.once(600, this, function() {
                                    this.currentMotion = 0;
                                    this.animator.crossFade(this.motions[this.currentMotion], 0.2);
                                });
                            });
                        }
                    }
                }
                break;
            }
            case "sc_kick": { //踢脚
                if(isDriven) {
                    this.onKickCallback(this.touchEvent);
                    console.log("本地踢脚");
                }
                break;
            }
            case "sc_jump": { //跳跃
                if(isDriven) {
                    this.onJumpCallback(this.touchEvent);
                    console.log("本地跳跃");
                }
                break;
            }
            case "sc_defend": { //防御
                console.log("[防御]" + obj.uid + ":" + obj.defend);
                if(isDriven) {
                    if(obj.defend == 1) {
                        this.onDefendCallback(this.touchEvent);
                        console.log("本地防御");
                    } else if(obj.defend == 0) {
                        this.handleMouseUp();
                        console.log("本地取消防御");
                        this.currentMotion = 0;
                    }
                }
                break;
            }
            case "sc_move": { //移动
                if(isDriven) {
                    var lastPosZ: number = this.gameObject.transform.position.z;
                    var currPosZ: number = obj.posz; //世界坐标系

                    this.gameObject.transform.position = new Laya.Vector3(0, 0, obj.posz);
                    if(lastPosZ == currPosZ) return;
                    if(this.isLocalPlayer) return;

                    Laya.timer.clear(this, this.playIdle); //取消待机
                    //3 ------> -3
                    var motionStr = "";
                    if(this.direction == 1) { //左边的人变小前进，变大后退
                        motionStr = (currPosZ < lastPosZ)? "[在前进]":"[在后退]";
                        this.currentMotion = (currPosZ < lastPosZ)? 1:2;
                    } else if (this.direction == - 1) { //右边的人变小后退，变大前进
                        motionStr = (currPosZ > lastPosZ)? "[在前进]":"[在后退]";
                        this.currentMotion = (currPosZ > lastPosZ)? 1:2;
                    }
                    this.animator.play(this.motions[this.currentMotion]);
                    Laya.timer.once(100, this, this.playIdle); //1秒后播放待机
                    console.log(this.avatarID + "[" + this.currentMotion + "]" + motionStr + lastPosZ.toFixed(3) + " ---> " + currPosZ.toFixed(3));
                }
                break;
            }
        }
    }

    public setUid(id: string, side: number): void {
        this.avatarID = id;
        this.direction = (side == 0)? 1 : -1;

        this.currentMotion = 0;
        this.animLastTime = 0;
        this.posy = 0;

        this.gameObject = this.owner as Laya.Sprite3D;
        this.animator = this.gameObject.getComponent(Laya.Animator);
        this.animator.play(this.motions[this.currentMotion]);

        this._clickTime = 0;
        if(this.isLocalPlayer) {
            MatchView.getInstance().fistBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendFist);
            MatchView.getInstance().kickBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendKick);
            MatchView.getInstance().jumpBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendJump);
            MatchView.getInstance().defendBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendDefend);
            // 全局
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.sendCancelDefend);
            if(this.isLocalPlayer) {
                JoystickView.getInstance().stickImage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            }
        }
    }

    //#region 移动控制

    // 基于UI
    mouseDown(e: Laya.Event): void {
        // console.log("JoystickView.mouseDown");
        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            console.log("在播放其他动作");
            return;
        }
        this.myFingerIndex = e.touchId;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseUp);
    }

    // 基于场景
    mouseMove(e: Laya.Event): void {
        // console.log("JoystickView.mouseMove");
        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            return;
        }
        if(Laya.Browser.onPC) { }
        else {
            if(e.touchId != this.myFingerIndex) {
                return;
            }
        }
        // 检测到攻击动画，就覆盖移动动画，停止移动
        if(this.isLocalPlayer) {
            //由动画驱动移动的发包
            this.currentMotion = (JoystickView.getInstance().Horizontal * 0.02 * this.direction > 0)? 1 : 2;
            this.animator.play(this.motions[this.currentMotion]);
        }
    }

    mouseUp(e: Laya.Event): void {
        // console.log("JoystickView.mouseUp");
        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            console.log("在播放其他动作");
            return;
        }
        if(Laya.Browser.onPC) {}
        else {
            if(e.touchId != this.myFingerIndex) {
                return;
            }
        }
        this.myFingerIndex = -1;
        this.currentMotion = 0;
        this.animator.crossFade(this.motions[this.currentMotion], 0.2);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseUp);
    }

    //#endregion

    public playIdle () {
        Laya.timer.clear(this, this.playOther); //停掉其他延迟执行的动作
        this.currentMotion = 0;
        this.animator.play(this.motions[this.currentMotion]);
        // console.log(this.avatarID + "播放待机动画");
    };

    public playOther () {
        this.animator.play(this.motions[this.currentMotion]);
    };

    // 带连击5,6,7 | 600
    sendFistData(waitTime,damage,broken): void {
        var obj: Object = {
            "type": "cs_fist",
            "uid": UserData.getInstance().uid,
            "damage": damage, //不知道是第几下
            "broken": broken,
            "motion": this.currentMotion,
            "waitTime": waitTime, //等待多久恢复待机
        };
        WebSocketClient.getInstance().sendData(obj);
        // console.log("发送出拳");
    }
    
    sendFist(): void {
        this.animLastTime = 600;
        var waitTime: number = 0;

        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime); //一定大于0
            if(this.currentMotion == 5 && waitTime < 200) {
                this._clickTime = Laya.Browser.now(); //点到了，更新时间
                this.currentMotion = 6;
                // Laya.timer.once(waitTime, this, this.playOther); //等待拳1播完，播拳2动画
                waitTime += this.animLastTime; //恢复待机的时间延长
                this.sendFistData(waitTime,20,0);
            } else if(this.currentMotion == 6 && waitTime < 200) {
                this._clickTime = Laya.Browser.now();
                this.currentMotion = 7;
                // Laya.timer.once(waitTime, this, this.playOther);
                waitTime += this.animLastTime; //恢复待机的时间延长
                this.sendFistData(waitTime,30,0);
            } else {
                console.error("点击过快");
                return;
            }
        } else {
            waitTime = this.animLastTime;
            this._clickTime = Laya.Browser.now();
            this.currentMotion = 5;
            // Laya.timer.once(0, this, this.playOther);
            this.sendFistData(waitTime,10,0);
        }
    }

    // 踢技8 | 600
    sendKick(e: Laya.Event): void {
        this.touchEvent = e;
        var obj: Object = {
            "type": "cs_kick",
            "uid": UserData.getInstance().uid,
        };
        WebSocketClient.getInstance().sendData(obj);
    }

    onKickCallback(e: Laya.Event): void {
        this.animLastTime = 600; //单次踢腿时长
        var waitTime: number = 0;

        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime); //一定大于0
            console.error("点击过快，等待：", waitTime / 1000, "秒");
            return;
        } else {
            
            waitTime = this.animLastTime;
            this._clickTime = Laya.Browser.now();
            this.currentMotion = 8;
            Laya.timer.once(0, this, this.playOther);
            console.log("========> onKickHandler.踢腿");
        }

        // 播完自动放待机
        Laya.timer.once(waitTime, this, this.playIdle);
        // console.log("播完自动放待机：", waitTime);
    }

    // 跳跃3，着陆4 | 800
    sendJump(e: Laya.Event): void {
        this.touchEvent = e;
        var obj: Object = {
            "type": "cs_jump",
            "uid": UserData.getInstance().uid,
        };
        WebSocketClient.getInstance().sendData(obj);
    }

    onJumpCallback(e: Laya.Event): void {
        this.animLastTime = 800; //单次踢腿时长
        var waitTime: number = 0;

        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime); //一定大于0
            console.error("点击过快，等待：", waitTime / 1000, "秒");
            return;
        } else {
            //不需要清理Idle延迟函数
            waitTime = this.animLastTime;
            this._clickTime = Laya.Browser.now();
            
            this.posy = 0.1;
            this.currentMotion = 3;
            this.animator.play(this.motions[this.currentMotion]); //跳跃
            
            Laya.timer.once(300, this, function() {
                this.posy = 0;
                Laya.timer.once(100, this, function() {
                    this.currentMotion = 4;
                    this.animator.play(this.motions[this.currentMotion]); //着陆
                });
            });
            console.log("========> onJumpHandler.跳跃");
        }

        // 播完自动放待机
        Laya.timer.once(waitTime, this, this.playIdle);
        // console.log("播完自动放待机：", waitTime);
    }

    // 防御9 | 500
    sendDefend(e: Laya.Event): void {
        this.touchEvent = e;
        var obj: Object = {
            "type": "cs_defend",
            "uid": UserData.getInstance().uid,
            "defend": 1,
        };
        WebSocketClient.getInstance().sendData(obj);
    }

    onDefendCallback(e: Laya.Event): void {
        this.animLastTime = 800; //单次踢腿时长
        var waitTime: number = 0;

        if(this.animLastTime > Laya.Browser.now() - this._clickTime) {
            waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime); //一定大于0
            console.error("点击过快，等待：", waitTime / 1000, "秒");
            return;
        } else {
            //不需要清理Idle延迟函数
            waitTime = this.animLastTime;
            this._clickTime = Laya.Browser.now();
            
            this.currentMotion = 9;
            this.animator.play(this.motions[this.currentMotion]); //跳跃
            console.log("========> onDefendHandler.防御");
        }
        // 松手才取消状态
    }

    // 取消防御9 | 500
    sendCancelDefend(e: Laya.Event): void {
        if(this.currentMotion == 9) {
            this.touchEvent = e;
            var obj: Object = {
                "type": "cs_defend",
                "uid": UserData.getInstance().uid,
                "defend": 0,
            };
            WebSocketClient.getInstance().sendData(obj);
        }
    }

    // 恢复待机
    handleMouseUp(): void {
        if(this.currentMotion == 9) {
            console.log("松手取消防御");
            this.animator.play(this.motions[0]); //待机
        }
    }
}