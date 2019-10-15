import {ui} from "../ui/layaMaxUI";
import WebSocketClient from "../WebSocketClient";
import PlayerController from "./PlayerController";
import JoystickView from "./JoystickView";
import LobbyView from "./LobbyView";

export default class MatchView extends ui.MatchUI {
	/*界面实例*/
    public static instance: MatchView;
    
    /*2D界面*/
    private joystick: JoystickView;

    /*3D场景*/
    public scene3d: Laya.Scene3D;
    public playerA: Laya.Sprite3D;
    public scriptA: PlayerController;
    private hpA: number = 300;
    public playerB: Laya.Sprite3D;
    public scriptB: PlayerController;
    private hpB: number = 300;
    
    /*数据*/
    public uid: string = "";

    constructor() {
        super();
        // this.createView(Laya.View.uiMap["Match"]);
        MatchView.instance = this;

        this.uid = Laya.LocalStorage.getItem("uid");
        Laya.stage.offAll("nethandle");
        Laya.stage.on("nethandle", this, this.handle);

        // 添加摇杆
        this.joystick = new JoystickView(); //加载模式/内嵌模式
        Laya.stage.addChild(this.joystick);

        // 添加3D场景
        // https://ldc2.layabox.com/doc/?nav=zh-ts-4-3-1
        // Laya.Scene3D.load("remote/unity3d/Empty.ls", Laya.Handler.create(this, this.onScene3DComplete));
        // /* 测试手动创建场景
        {
            //添加3D场景
            this.scene3d = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
            this.scene3d.zOrder = -1;
            //添加照相机
            var camera: Laya.Camera = (this.scene3d.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
            camera.transform.translate(new Laya.Vector3(6, 2, 0));
			camera.transform.rotate(new Laya.Vector3(3, 90, 0), true, false);
			// camera.transform.position = new Laya.Vector3(6, 2, 0);
			// camera.transform.rotationEuler = new Laya.Vector3(3, 90, 0);
            // //添加方向光
            // var directionLight: Laya.DirectionLight = this.scene3d.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
            // directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            //添加点光源
            var pointLight: Laya.PointLight = this.scene3d.addChild(new Laya.PointLight()) as Laya.PointLight;
			pointLight.transform.position = new Laya.Vector3(1, 2, 0);
            pointLight.color = new Laya.Vector3(1, 0.9, 0.8);
            pointLight.intensity = 2;
			//加载精灵
            Laya.Sprite3D.load("remote/unity3d/RPG-Character.lh", Laya.Handler.create(this, this.onPlayerComplete));
        }
        // */

        this.exitBtn.on(Laya.Event.MOUSE_DOWN, this, ()=> {
            Laya.stage.removeChild(this.joystick);
            Laya.stage.removeChild(this.scene3d);
            Laya.stage.removeChild(this.playerA);
            Laya.stage.removeChild(this.playerB);
            Laya.stage.removeChild(this);
            var lobbyView = new LobbyView(); //加载模式/内嵌模式
            Laya.stage.addChild(lobbyView);
            console.log("离开游戏");
        });
    }

    onScene3DComplete(sc: Laya.Scene3D): void {
        this.scene3d = sc;
        this.scene3d.zOrder = -1;
        Laya.stage.addChild(this.scene3d);

        var cam = Laya.stage.getChildByName("Main Camera") as Laya.Camera;
        console.log("摄像机：" + cam.transform.position);

        // console.log("场景加载完成");
        //加载精灵
        Laya.Sprite3D.load("remote/unity3d/RPG-Character.lh", Laya.Handler.create(this, this.onPlayerComplete));
    }

    onPlayerComplete(sp: Laya.Sprite3D): void {
        // console.log("角色加载完成");
        var prefabA = Laya.Sprite3D.instantiate(sp);
        var prefabB = Laya.Sprite3D.instantiate(sp);
        this.playerA = this.scene3d.addChild(prefabA) as Laya.Sprite3D;
        this.playerB = this.scene3d.addChild(prefabB) as Laya.Sprite3D;

        //修改材质的反射颜色，让模型偏红
        this.playerA.transform.position = new Laya.Vector3(0, 0, 3);
        this.playerA.transform.rotation = new Laya.Quaternion(0, 1, 0, 0); //朝右
        var matA = (this.playerA.getChildAt(1) as Laya.SkinnedMeshSprite3D).skinnedMeshRenderer.material as Laya.BlinnPhongMaterial;
        matA.albedoColor = new Laya.Vector4(0,1,0,1); //绿色

        this.playerB.transform.position = new Laya.Vector3(0, 0, -3);
        this.playerB.transform.rotation = new Laya.Quaternion(0, 0, 0, -1); //朝左
        var matB = (this.playerB.getChildAt(1) as Laya.SkinnedMeshSprite3D).skinnedMeshRenderer.material as Laya.BlinnPhongMaterial;
        matB.albedoColor = new Laya.Vector4(0,0,1,1);

        this.sendGameReady();
    }

    // 场景加载完成
    private sendGameReady(): void {
        var obj: Object = {
            "type": "cs_gameReady",
            "uid": this.uid,
        };
        WebSocketClient.getInstance().sendData(obj);
        console.log("发送准备完成");
    }
    
    // 离开游戏
    private sendExitGame(): void {
        var obj: Object = {
            "type": "cs_exitGame",
            "uid": this.uid,
        };
        WebSocketClient.getInstance().sendData(obj);
        console.log("发送离开游戏");
    }
    
    // 碰撞校验都由客户端完成，服务器只做分发
    private handle(obj): void {
        var isLocalPlayer: boolean = (obj.uid == this.uid);
        switch(obj.type) {
            case "sc_exit": { //离开游戏
                console.log("收到逃跑" + obj.nickname);
                break;
            }
            case "sc_ready": { //准备完成
                console.log("收到准备完成：" + obj.user0.nickname + " vs " + obj.user1.nickname);
                this.playerA.addComponent(PlayerController);
                this.playerB.addComponent(PlayerController);
                this.scriptA = this.playerA.getComponent(PlayerController);
                this.scriptB = this.playerB.getComponent(PlayerController);
                if(this.uid == obj.user0.uid) {
                    console.log("我在左边");
                } else if (this.uid == obj.user1.uid) {
                    console.log("我在右边");
                }
                this.scriptA.setUid(obj.user0.uid, 0);
                this.scriptB.setUid(obj.user1.uid, 1);
                // 血条初始化
                this.hpA = 300;
                this.hp0Text.text = this.hpA.toString();
                this.fillImage0.width = this.hpA;
                this.name0Text.text = obj.user0.nickname;
                this.hpB = 300;
                this.hp1Text.text = this.hpB.toString();
                this.fillImage1.width = this.hpB;
                this.name1Text.text = obj.user1.nickname;
                break;
            }
        }
    }

    public checkDistance(): number {
        var distance: number = this.playerA.transform.position.z - this.playerB.transform.position.z;
        // console.log("A-B间距：", distance.toFixed(1));
        return distance;
    }

    public updateHP(player: PlayerController, damage: number): void {
        if(player == this.scriptA) {
            if(this.hpA <= damage) {
                console.log("玩家A已死亡");
                return;
            }
            this.hpA -= damage;
            this.hp0Text.text = this.hpA.toString();
            this.fillImage0.width = this.hpA;
        } else if (player == this.scriptB) {
            if(this.hpB <= damage) {
                console.log("玩家B已死亡");
                return;
            }
            this.hpB -= damage;
            this.hp1Text.text = this.hpB.toString();
            this.fillImage1.width = this.hpB;
        }
    }
}