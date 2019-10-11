(function () {
    'use strict';

    class LogManager extends Laya.Script {
        constructor() {
            super();
            LogManager.instance = this;
        }
        onAwake() {
            this.content = "";
            this.logText = this.logNode;
            Laya.stage.on(Laya.Event.DOUBLE_CLICK, this, this.resetConsole);
        }
        vConsole(msg) {
            if (msg == this.lastmsg) ;
            else {
                this.content += "\n" + msg;
            }
            this.logText.text = this.content;
            this.lastmsg = msg;
        }
        resetConsole() {
            this.content = "";
            this.logText.text = this.content;
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scripts/LogManager.ts", LogManager);
        }
    }
    GameConfig.width = 1280;
    GameConfig.height = 720;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Load.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class JoystickUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(JoystickUI.uiView);
            }
        }
        JoystickUI.uiView = { "type": "Scene", "props": { "zOrder": 1, "width": 1280, "name": "Joystick", "mouseThrough": true, "height": 720 }, "compId": 2, "child": [{ "type": "Image", "props": { "width": 180, "var": "stickImage", "skin": "ui/joystickPoint.png", "name": "Stick", "left": 50, "height": 180, "bottom": 50, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }, { "type": "Image", "props": { "width": 240, "var": "roundImage", "skin": "ui/joystickBg.png", "name": "Round", "left": 20, "height": 240, "bottom": 20, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }], "loadList": ["ui/joystickPoint.png", "ui/joystickBg.png"], "loadList3D": [] };
        ui.JoystickUI = JoystickUI;
        REG("ui.JoystickUI", JoystickUI);
        class LoadUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(LoadUI.uiView);
            }
        }
        LoadUI.uiView = { "type": "Scene", "props": { "width": 1280, "name": "Load", "height": 720 }, "compId": 2, "child": [{ "type": "Script", "props": { "runtime": "laya.ui.Widget" }, "compId": 4 }, { "type": "ProgressBar", "props": { "x": 640, "width": 600, "var": "progressBar", "value": 0, "skin": "comp/progress.png", "sizeGrid": "0,10,0,10", "name": "ProgressBar", "height": 30, "bottom": 120, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5, "child": [{ "type": "Label", "props": { "x": 300, "var": "progressLabel", "text": "0%", "name": "ProgressLabel", "fontSize": 30, "font": "Arial", "color": "#ffffff", "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 7 }] }], "loadList": ["comp/progress.png"], "loadList3D": [] };
        ui.LoadUI = LoadUI;
        REG("ui.LoadUI", LoadUI);
        class LobbyUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(LobbyUI.uiView);
            }
        }
        LobbyUI.uiView = { "type": "Scene", "props": { "width": 1280, "name": "Lobby", "height": 720 }, "compId": 2, "child": [{ "type": "Script", "props": { "y": 0, "x": 0, "runtime": "laya.ui.Widget" }, "compId": 5 }, { "type": "Button", "props": { "x": 1191, "var": "signBtn", "skin": "comp/button.png", "name": "Sign", "labelStrokeColor": "#ffffff", "labelSize": 22, "labelColors": "#ffffff", "label": "签到", "centerY": -318, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }, { "type": "Button", "props": { "y": 670, "x": 1191, "var": "matchBtn", "skin": "comp/button.png", "name": "Match", "labelStrokeColor": "#ffffff", "labelSize": 22, "labelColors": "#ffffff", "label": "匹配", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }, { "type": "Image", "props": { "y": 360, "x": 640, "width": 1280, "var": "registerPanel", "skin": "comp/img_blank.png", "name": "RegisterPanel", "height": 720, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 9, "child": [{ "type": "Image", "props": { "y": 363, "x": 640, "width": 640, "skin": "comp/img_blank.png", "name": "Page", "height": 360, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 10, "child": [{ "type": "Text", "props": { "y": 84, "x": 150, "text": "用户名", "fontSize": 22, "color": "#ffffff", "align": "center", "runtime": "laya.display.Text" }, "compId": 17 }, { "type": "TextInput", "props": { "y": 80, "x": 240, "width": 160, "var": "nicknameInput", "valign": "middle", "skin": "comp/textinput.png", "sizeGrid": "10,10,10,10", "name": "Nickname", "height": 30, "fontSize": 22, "font": "Arial" }, "compId": 11, "child": [{ "type": "Text", "props": { "y": 35, "text": "2-12个字符", "fontSize": 12, "color": "#ffffff", "align": "center", "runtime": "laya.display.Text" }, "compId": 20 }] }, { "type": "Text", "props": { "y": 144, "x": 172, "text": "密码", "fontSize": 22, "color": "#ffffff", "align": "center", "runtime": "laya.display.Text" }, "compId": 18 }, { "type": "TextInput", "props": { "y": 140, "x": 240, "width": 160, "var": "passwordInput", "valign": "middle", "skin": "comp/textinput.png", "sizeGrid": "10,10,10,10", "name": "Password", "height": 30, "fontSize": 22, "font": "Arial" }, "compId": 12, "child": [{ "type": "Text", "props": { "y": 35, "x": 0, "text": "6-16个字符", "fontSize": 12, "color": "#ffffff", "align": "center", "runtime": "laya.display.Text" }, "compId": 21 }] }, { "type": "Text", "props": { "y": 204, "x": 128, "text": "确认密码", "fontSize": 22, "color": "#ffffff", "align": "center", "runtime": "laya.display.Text" }, "compId": 19 }, { "type": "TextInput", "props": { "y": 200, "x": 240, "width": 160, "var": "password2Input", "valign": "middle", "skin": "comp/textinput.png", "sizeGrid": "10,10,10,10", "name": "Password2", "height": 30, "fontSize": 22, "font": "Arial" }, "compId": 16 }, { "type": "Button", "props": { "y": 280, "x": 320, "width": 160, "var": "registerBtn", "skin": "comp/button.png", "sizeGrid": "10,10,10,10", "name": "Register", "labelStrokeColor": "#ffffff", "labelSize": 22, "labelColors": "#ffffff", "label": "立即注册", "height": 40, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 13 }] }] }, { "type": "Image", "props": { "y": 360, "x": 640, "width": 1280, "name": "UserPanel", "height": 720, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 22, "child": [{ "type": "Image", "props": { "y": 20, "width": 80, "skin": "comp/img_bg5.png", "sizeGrid": "10,10,10,10", "name": "HeadImg", "left": 20, "height": 80 }, "compId": 23, "child": [{ "type": "Text", "props": { "y": 10, "x": 100, "var": "nickNameText", "text": "用户昵称", "name": "NickName", "fontSize": 22, "color": "#ffffff", "runtime": "laya.display.Text" }, "compId": 24 }] }] }, { "type": "Image", "props": { "y": 360, "x": 640, "width": 1280, "var": "awardPanel", "name": "AwardPanel", "height": 720, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 25, "child": [{ "type": "Image", "props": { "y": 360, "x": 640, "width": 320, "skin": "comp/img_blank.png", "name": "Page", "height": 360, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 26, "child": [{ "type": "Text", "props": { "y": 40, "x": 116, "text": "恭喜获得", "pivotX": 0.5, "fontSize": 22, "color": "#ffffff", "align": "center", "runtime": "laya.display.Text" }, "compId": 27 }, { "type": "Image", "props": { "y": 100, "x": 110, "width": 100, "skin": "comp/img_bg4.png", "sizeGrid": "10,10,10,10", "name": "AwardImg", "height": 100 }, "compId": 37 }, { "type": "Button", "props": { "y": 260, "width": 160, "skin": "comp/button.png", "sizeGrid": "10,10,10,10", "name": "Register", "labelStrokeColor": "#ffffff", "labelSize": 22, "labelColors": "#ffffff", "label": "领取双倍", "height": 40, "centerX": 1, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 35 }, { "type": "Label", "props": { "var": "closeAwardBtn", "text": "直接关闭", "name": "CloseAward", "fontSize": 11, "color": "#ffffff", "centerX": 1, "bottom": 40, "anchorY": 0.5, "anchorX": 0.5, "align": "center" }, "compId": 36 }] }] }], "loadList": ["comp/button.png", "comp/img_blank.png", "comp/textinput.png", "comp/img_bg5.png", "comp/img_bg4.png"], "loadList3D": [] };
        ui.LobbyUI = LobbyUI;
        REG("ui.LobbyUI", LobbyUI);
        class MainUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(MainUI.uiView);
            }
        }
        MainUI.uiView = { "type": "Scene", "props": { "width": 1280, "name": "Main", "height": 720 }, "compId": 2, "child": [{ "type": "Script", "props": { "y": 0, "x": 0, "top": 0, "right": 0, "left": 0, "bottom": 0, "runtime": "laya.ui.Widget" }, "compId": 51 }, { "type": "Script", "props": { "y": 0, "x": 0, "logNode": "@node:71", "gamePad": "@node:41", "runtime": "scripts/LogManager.ts" }, "compId": 72 }, { "type": "Sprite", "props": { "name": "Viewport" }, "compId": 19, "child": [{ "type": "Text", "props": { "text": "左上1", "name": "TextUL", "fontSize": 40, "font": "Arial", "color": "#ffffff", "runtime": "laya.display.Text" }, "compId": 4 }, { "type": "Text", "props": { "y": 0, "x": 1200, "text": "右上", "name": "TextUR", "fontSize": 40, "color": "#ff0400", "runtime": "laya.display.Text" }, "compId": 12 }, { "type": "Text", "props": { "y": 680, "x": 0, "text": "左下", "name": "TextDL", "fontSize": 40, "color": "#ff0400", "runtime": "laya.display.Text" }, "compId": 14 }, { "type": "Text", "props": { "y": 680, "x": 1200, "text": "右下", "name": "TextDR", "fontSize": 40, "color": "#ff0400", "runtime": "laya.display.Text" }, "compId": 13 }, { "type": "Text", "props": { "x": 100, "presetID": 1, "y": 0, "width": 1080, "text": "log", "name": "Console", "isPresetRoot": true, "height": 720, "fontSize": 16, "color": "#ff0400", "runtime": "laya.display.Text" }, "compId": 71 }] }, { "type": "Image", "props": { "width": 240, "skin": "ui/joystickBg.png", "right": 50, "pivotY": 120, "pivotX": 120, "name": "GamePad", "height": 240, "bottom": 57 }, "compId": 41, "child": [{ "type": "Image", "props": { "y": 50, "x": 120, "width": 100, "stateNum": 3, "skin": "ui/joystickPoint.png", "name": "Jump", "labelSize": 30, "label": "跳跃", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 21 }, { "type": "Image", "props": { "y": 120, "x": 50, "width": 100, "stateNum": 3, "skin": "ui/joystickPoint.png", "name": "Defend", "labelSize": 30, "label": "防御", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 22 }, { "type": "Image", "props": { "y": 120, "x": 190, "width": 100, "stateNum": 3, "skin": "ui/joystickPoint.png", "name": "Kick", "labelSize": 30, "label": "踢腿", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 23 }, { "type": "Image", "props": { "y": 190, "x": 120, "width": 100, "stateNum": 3, "skin": "ui/joystickPoint.png", "name": "Fist", "labelSize": 30, "label": "重拳", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 24 }] }, { "type": "Image", "props": { "y": 430, "width": 240, "visible": false, "var": "roundImage", "skin": "ui/joystickBg.png", "name": "Round", "mouseThrough": true, "mouseEnabled": false, "left": 550, "hitTestPrior": false, "height": 240, "bottom": 50, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 57 }, { "type": "Image", "props": { "y": 0, "width": 180, "visible": false, "var": "stickImage", "skin": "ui/joystickPoint.png", "name": "Stick", "mouseThrough": true, "left": 580, "height": 180, "bottom": 80, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 61 }, { "type": "Button", "props": { "var": "exitBtn", "skin": "comp/button.png", "name": "Exit", "labelStrokeColor": "#ffffff", "labelSize": 22, "labelColors": "#ffffff", "label": "离开" }, "compId": 73 }], "loadList": ["prefab/Console.prefab", "ui/joystickBg.png", "ui/joystickPoint.png", "comp/button.png"], "loadList3D": [] };
        ui.MainUI = MainUI;
        REG("ui.MainUI", MainUI);
    })(ui || (ui = {}));

    class WebSocketClient extends Laya.Script {
        static getInstance() {
            if (this.instance == null) {
                this.instance = new WebSocketClient();
            }
            return this.instance;
        }
        constructor() {
            super();
        }
        initSocket() {
            this.byte = new Laya.Byte();
            this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
            this.socket = new Laya.Socket();
            this.socket.endian = Laya.Byte.LITTLE_ENDIAN;
            var url = "ws://192.168.1.101:3001";
            this.socket.connectByUrl(url);
            this.socket.on(Laya.Event.OPEN, this, this.openHandler);
            this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
            this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
            this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
        }
        sendData(obj) {
            if (!this.socket.connected) {
                console.error("已经断开连接.");
                return;
            }
            this.socket.send(JSON.stringify(obj));
        }
        openHandler(event = null) {
            console.log("正确建立连接；");
        }
        receiveHandler(msg = null) {
            var obj = JSON.parse(msg);
            Laya.stage.event("nethandle", obj);
        }
        closeHandler(e = null) {
            console.log("关闭事件");
        }
        errorHandler(e = null) {
            console.log("连接出错");
        }
    }

    class JoystickView extends ui.JoystickUI {
        constructor() {
            super();
            this.speed = 0;
            this.centerX = -1;
            this.centerY = -1;
            this.Horizontal = 0;
            this.Vertical = 0;
            this.myIndex = -1;
            this.lastX = 0;
            this.lastY = 0;
            this.createView(Laya.View.uiMap["Joystick"]);
            JoystickView.instance = this;
            console.log("roundImage: ", this.roundImage != null);
            console.log("stickImage: ", this.stickImage != null);
            this.stickImage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
            Laya.timer.frameLoop(1, this, this.outputData);
        }
        mouseDown(e) {
            this.myIndex = e.touchId;
            this.centerX = this.roundImage.x;
            this.centerY = this.roundImage.y;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }
        mouseMove(e) {
            var dx = 0;
            var dy = 0;
            if (Laya.Browser.onPC) {
                dx = Laya.stage.mouseX;
                dy = Laya.stage.mouseY;
            }
            else {
                if (e.touchId != this.myIndex) {
                    return;
                }
                if (e.touches.length <= this.myIndex) {
                    return;
                }
                this.touches = e.touches;
                dx = this.touches[this.myIndex].stageX;
                dy = this.touches[this.myIndex].stageY;
            }
            if (this.centerX >= 0 && this.centerY >= 0) {
                let dis = this.dis(this.centerX, this.centerY, dx, dy);
                if (dis > 40) {
                    this.stickImage.pos(this.centerX + Math.cos(this.angle) * 40, this.centerY + Math.sin(this.angle) * 40);
                }
                else {
                    this.stickImage.pos(dx, dy);
                }
                if (dis > 3) {
                    this.speed = 2;
                }
                else {
                    this.speed = 0;
                }
            }
        }
        mouseUp(e) {
            if (Laya.Browser.onPC) ;
            else {
                if (e.touchId != this.myIndex) {
                    return;
                }
            }
            this.myIndex = -1;
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.speed = 0;
            this.stickImage.pos(this.roundImage.x, this.roundImage.y);
        }
        mouseOut(e) {
            if (Laya.Browser.onPC) ;
            else {
                if (e.touchId != this.myIndex) {
                    return;
                }
            }
            this.myIndex = -1;
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            this.speed = 0;
            this.stickImage.pos(this.roundImage.x, this.roundImage.y);
        }
        outputData() {
            if (this.speed > 0) {
                var dx = 0;
                var dy = 0;
                if (Laya.Browser.onPC) {
                    dx = Laya.stage.mouseX - this.centerX;
                    dy = Laya.stage.mouseY - this.centerY;
                }
                else {
                    if (this.touches.length <= this.myIndex) {
                        return;
                    }
                    dx = this.touches[this.myIndex].stageX - this.centerX;
                    dy = this.touches[this.myIndex].stageY - this.centerY;
                    if (isNaN(dx) || isNaN(dy)) {
                        dx = this.lastX;
                        dy = this.lastY;
                    }
                    else {
                        this.lastX = dx;
                        this.lastY = dy;
                    }
                }
                this.angle = Math.atan2(dy, dx);
                var h = Math.cos(this.angle) * this.speed;
                this.Horizontal = isNaN(h) ? 0 : h;
            }
        }
        dis(centerX, centerY, mouseX, mouseY) {
            let dx = centerX - mouseX;
            let dy = centerY - mouseY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance;
        }
    }

    class PlayerController extends Laya.Script3D {
        constructor() {
            super();
            this.motions = [
                "Unarmed-Idle",
                "Unarmed-Strafe-Forward",
                "Unarmed-Strafe-Backward",
                "Unarmed-Jump",
                "Unarmed-Land",
                "Unarmed-Attack-L1",
                "Unarmed-Attack-L2",
                "Unarmed-Attack-L3",
                "Unarmed-Attack-Kick-L1",
                "Unarmed-Defend",
            ];
            this.currentMotion = 0;
            this.animLastTime = 0;
            this.posy = 0;
            this.posz = 0;
            this.myIndex = -1;
        }
        onStart() {
            this.gameObject = MainView.instance.playerA;
            this.animator = this.gameObject.getComponent(Laya.Animator);
            this.animator.play(this.motions[0]);
            this.currentMotion = 0;
            this.animLastTime = 0;
            this.posy = 0;
            this.posz = 0;
            this._clickTime = 0;
            var gamePad = LogManager.instance.gamePad;
            this.fistBtn = gamePad.getChildByName("Fist");
            this.fistBtn.on(Laya.Event.MOUSE_DOWN, this, this.onFistHandler);
            this.kickBtn = gamePad.getChildByName("Kick");
            this.kickBtn.on(Laya.Event.MOUSE_DOWN, this, this.onKickHandler);
            this.jumpBtn = gamePad.getChildByName("Jump");
            this.jumpBtn.on(Laya.Event.MOUSE_DOWN, this, this.onJumpHandler);
            this.defendBtn = gamePad.getChildByName("Defend");
            this.defendBtn.on(Laya.Event.MOUSE_DOWN, this, this.onDefendHandler);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.handleMouseUp);
            console.log("JoystickView: ", (JoystickView.instance != null));
            JoystickView.instance.stickImage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        }
        onUpdate() {
            if (this.gameObject.transform.position.y > 0 && this.posy == 0) {
                this.gameObject.transform.translate(new Laya.Vector3(0, -0.1, this.posz), true);
                if (this.gameObject.transform.position.y < 0) {
                    this.gameObject.transform.position.y = 0;
                }
            }
            else {
                this.gameObject.transform.translate(new Laya.Vector3(0, this.posy, this.posz), true);
            }
        }
        mouseDown(e) {
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                console.log("在播放其他动作");
                return;
            }
            this.myIndex = e.touchId;
            this.posz = 0;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        }
        mouseMove(e) {
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                LogManager.instance.vConsole("在播放其他动作");
                this.posz = 0;
                return;
            }
            if (Laya.Browser.onPC) ;
            else {
                if (e.touchId != this.myIndex) {
                    return;
                }
            }
            this.posz = JoystickView.instance.Horizontal * 0.02;
            this.currentMotion = (this.posz > 0) ? 1 : 2;
            this.animator.play(this.motions[this.currentMotion]);
        }
        mouseUp(e) {
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                console.log("在播放其他动作");
                return;
            }
            if (Laya.Browser.onPC) ;
            else {
                if (e.touchId != this.myIndex) {
                    LogManager.instance.vConsole("离开的点是其他手指：" + e.touchId + "，摇杆的手指是：" + this.myIndex);
                    return;
                }
            }
            this.myIndex = -1;
            this.posz = 0;
            this.currentMotion = 0;
            this.animator.crossFade(this.motions[this.currentMotion], 0.2);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        }
        mouseOut(e) {
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                console.log("在播放其他动作");
                return;
            }
            if (Laya.Browser.onPC) ;
            else {
                if (e.touchId != this.myIndex) {
                    return;
                }
            }
            this.myIndex = -1;
            this.posz = 0;
            this.currentMotion = 0;
            this.animator.crossFade(this.motions[this.currentMotion], 0.2);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        }
        handleMouseUp() {
            if (this.currentMotion == 9) {
                console.log("松手取消防御");
                this.animator.play(this.motions[0]);
            }
        }
        playIdle() {
            Laya.timer.clear(this, this.playOther);
            this.currentMotion = 0;
            this.animator.play(this.motions[this.currentMotion]);
            console.log("播放待机动画");
        }
        ;
        playOther() {
            this.animator.play(this.motions[this.currentMotion]);
        }
        ;
        onFistHandler(e) {
            this.animLastTime = 600;
            var waitTime = 0;
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime);
                if (this.currentMotion == 5 && waitTime < 200) {
                    this._clickTime = Laya.Browser.now();
                    this.currentMotion = 6;
                    Laya.timer.once(waitTime, this, this.playOther);
                    console.log("========> onFistBtn.重拳2，等待：", waitTime);
                    waitTime += this.animLastTime;
                }
                else if (this.currentMotion == 6 && waitTime < 200) {
                    this._clickTime = Laya.Browser.now();
                    this.currentMotion = 7;
                    Laya.timer.once(waitTime, this, this.playOther);
                    console.log("========> onFistBtn.重拳3");
                    waitTime += this.animLastTime;
                }
                else {
                    console.error("点击过快");
                    return;
                }
            }
            else {
                waitTime = this.animLastTime;
                this._clickTime = Laya.Browser.now();
                this.currentMotion = 5;
                Laya.timer.once(0, this, this.playOther);
                console.log("========> onFistHandler.重拳1");
            }
            Laya.timer.once(waitTime, this, this.playIdle);
            console.log("播完自动放待机：", waitTime);
        }
        onKickHandler(e) {
            this.animLastTime = 600;
            var waitTime = 0;
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime);
                console.error("点击过快，等待：", waitTime / 1000, "秒");
                return;
            }
            else {
                waitTime = this.animLastTime;
                this._clickTime = Laya.Browser.now();
                this.currentMotion = 8;
                Laya.timer.once(0, this, this.playOther);
                console.log("========> onKickHandler.踢腿");
            }
            Laya.timer.once(waitTime, this, this.playIdle);
            console.log("播完自动放待机：", waitTime);
        }
        onJumpHandler(e) {
            this.animLastTime = 800;
            var waitTime = 0;
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime);
                console.error("点击过快，等待：", waitTime / 1000, "秒");
                return;
            }
            else {
                waitTime = this.animLastTime;
                this._clickTime = Laya.Browser.now();
                this.posy = 0.1;
                this.currentMotion = 3;
                this.animator.play(this.motions[this.currentMotion]);
                Laya.timer.once(300, this, function () {
                    this.posy = 0;
                    Laya.timer.once(100, this, function () {
                        this.currentMotion = 4;
                        this.animator.play(this.motions[this.currentMotion]);
                    });
                });
                console.log("========> onJumpHandler.跳跃");
            }
            Laya.timer.once(waitTime, this, this.playIdle);
            console.log("播完自动放待机：", waitTime);
        }
        onDefendHandler(e) {
            this.animLastTime = 800;
            var waitTime = 0;
            if (this.animLastTime > Laya.Browser.now() - this._clickTime) {
                waitTime = this.animLastTime - (Laya.Browser.now() - this._clickTime);
                console.error("点击过快，等待：", waitTime / 1000, "秒");
                return;
            }
            else {
                waitTime = this.animLastTime;
                this._clickTime = Laya.Browser.now();
                this.currentMotion = 9;
                this.animator.play(this.motions[this.currentMotion]);
                console.log("========> onDefendHandler.防御");
            }
        }
    }

    class MainView extends ui.MainUI {
        constructor() {
            super();
            this.createView(Laya.View.uiMap["Main"]);
            MainView.instance = this;
            this.joystick = new JoystickView();
            Laya.stage.addChild(this.joystick);
            Laya.Scene3D.load("res/scenes/Empty.ls", Laya.Handler.create(this, this.onScene3DComplete));
            this.exitBtn.on(Laya.Event.MOUSE_DOWN, this, () => {
                Laya.stage.removeChild(this.scene3d);
                Laya.stage.removeChild(this.playerA);
                Laya.stage.removeChild(this.joystick);
                Laya.stage.removeChild(this);
                var lobbyView = new LobbyView();
                Laya.stage.addChild(lobbyView);
                console.log("离开游戏");
            });
        }
        onScene3DComplete(sc) {
            this.scene3d = sc;
            this.scene3d.zOrder = -1;
            Laya.stage.addChild(this.scene3d);
            console.log("场景加载完成");
            Laya.Sprite3D.load("res/prefabs/RPG-CharacterA.lh", Laya.Handler.create(this, this.onPlayerAComplete));
        }
        onPlayerAComplete(sp) {
            console.log("3D精灵加载完成");
            if (this.playerA == null) {
                this.playerA = this.scene3d.addChild(sp);
                this.playerA.addComponent(PlayerController);
            }
        }
    }

    class LobbyView extends ui.LobbyUI {
        constructor() {
            super();
            this.client = null;
            this.uid = null;
            this.createView(Laya.View.uiMap["Lobby"]);
            Laya.SoundManager.playMusic("res/audios/bgm.mp3", 0);
            Laya.SoundManager.autoStopMusic = true;
            console.log("播放音乐.");
            this.client = WebSocketClient.getInstance();
            this.client.initSocket();
            Laya.stage.offAll("nethandle");
            Laya.stage.on("nethandle", this, this.handle);
            this.nicknameInput.on(Laya.Event.BLUR, this, () => {
                console.log("网络校验昵称 3");
            });
            this.registerBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendRegister);
            this.awardPanel.visible = false;
            this.signBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendSign);
            this.closeAwardBtn.on(Laya.Event.MOUSE_DOWN, this, () => {
                this.awardPanel.visible = false;
            });
            this.matchBtn.on(Laya.Event.MOUSE_DOWN, this, this.sendMatch);
            this.uid = Laya.LocalStorage.getItem("uid");
            this.registerPanel.visible = this.uid == null;
        }
        static getInstance() {
            if (this.instance == null) {
                this.instance = new LobbyView();
            }
            return this.instance;
        }
        handle(obj) {
            switch (obj.type) {
                case "sc_enter": {
                    console.log("建立连接");
                    if (this.uid != null) {
                        this.sendLogin();
                    }
                    break;
                }
                case "sc_login_success": {
                    console.log("登陆成功，写入cookie：" + obj.uid);
                    Laya.LocalStorage.setItem("uid", obj.uid);
                    this.registerPanel.visible = false;
                    this.nickNameText.text = obj.nickname;
                    break;
                }
                case "sc_login_failed": {
                    console.log("登陆失败");
                    break;
                }
                case "sc_match_success": {
                    console.log("匹配成功");
                    Laya.timer.once(1000, this, this.onEnterGame);
                    break;
                }
                case "sc_match_failed": {
                    console.log("匹配失败");
                    break;
                }
                case "sc_sign_success": {
                    console.log("签到成功，看广告x2");
                    this.awardPanel.visible = true;
                    break;
                }
                case "sc_message": {
                    break;
                }
            }
        }
        sendCheckNickName() {
            var obj = {
                "type": "cs_check_register",
                "nick": this.nicknameInput.text,
            };
            this.client.sendData(obj);
        }
        sendRegister() {
            if (this.nicknameInput.text.length < 2 || this.nicknameInput.text.length > 12) {
                console.log("用户名应为2-12个字符");
                return;
            }
            if (this.passwordInput.text.length < 6 || this.passwordInput.text.length > 16) {
                console.log("密码应为6-16个字符");
                return;
            }
            if (this.password2Input.text != this.passwordInput.text) {
                console.log("两次密码输入不一致");
                return;
            }
            var obj = {
                "type": "cs_register",
                "nick": this.nicknameInput.text,
                "pwd": this.password2Input.text,
            };
            this.client.sendData(obj);
        }
        sendLogin() {
            var obj = {
                "type": "cs_login",
                "uid": Laya.LocalStorage.getItem("uid"),
            };
            this.client.sendData(obj);
        }
        setUserData() { }
        sendSign() {
            var obj = {
                "type": "cs_sign",
                "uid": Laya.LocalStorage.getItem("uid"),
            };
            this.client.sendData(obj);
        }
        sendMatch() {
            var obj = {
                "type": "cs_match",
                "uid": Laya.LocalStorage.getItem("uid"),
            };
            this.client.sendData(obj);
        }
        onCheckRegister() {
            console.log("昵称检查结果.");
        }
        onCheckSign() {
            console.log("检查当天签到.");
        }
        onSign() { }
        onMatch() { }
        onEnterGame() {
            var mainView = new MainView();
            Laya.stage.addChild(mainView);
            Laya.stage.removeChild(this);
        }
    }

    class LoadView extends ui.LoadUI {
        static getInstance() {
            if (this.instance == null) {
                this.instance = new LoadView();
            }
            return this.instance;
        }
        constructor() {
            super();
            this.createView(Laya.View.uiMap["Load"]);
            this.progressBar.value = 0;
            this.progressLabel.text = "0%";
            Laya.timer.once(1000, this, this.onProLoaded);
        }
        onProLoaded() {
            var res = [
                { url: "res/atlas/ui.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/ui.png", type: Laya.Loader.IMAGE },
                { url: "res/audios/bgm.mp3", type: Laya.Loader.SOUND },
            ];
            Laya.loader.load(res, null, Laya.Handler.create(this, this.onProgress, null, false));
        }
        onProgress(pro) {
            this.progressBar.value = pro;
            this.progressLabel.text = Math.floor(pro * 100) + "%";
            if (this.progressBar.value == 1) {
                this.progressBar.value = pro;
                Laya.timer.once(1000, this, this.onComplete);
            }
        }
        onComplete() {
            var lobbyView = new LobbyView();
            Laya.stage.addChild(lobbyView);
            Laya.stage.removeChild(this);
        }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            var res = [
                { url: "ui.json", type: Laya.Loader.JSON },
                { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/comp.png", type: Laya.Loader.IMAGE },
                { url: "res/atlas/ui.atlas", type: Laya.Loader.ATLAS },
                { url: "res/atlas/ui.png", type: Laya.Loader.IMAGE },
            ];
            Laya.loader.load(res, Laya.Handler.create(this, this.onLoaded));
        }
        onLoaded() {
            Laya.View.uiMap = Laya.Loader.getRes("ui.json");
            this.loadView = new LoadView();
            Laya.stage.addChild(this.loadView);
        }
    }
    new Main();

}());
