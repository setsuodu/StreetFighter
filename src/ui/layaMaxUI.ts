/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
    export class ChooseUI extends Laya.Scene {
		public mask:Laya.Image;
		public yesBtn:Laya.Button;
		public noBtn:Laya.Button;
        public static  uiView:any ={"type":"Scene","props":{"zOrder":99,"width":1280,"name":"Choose","height":720},"compId":2,"child":[{"type":"Image","props":{"y":360,"x":640,"width":1280,"var":"mask","skin":"comp/img_blank.png","name":"Mask","label":"确定","height":720,"anchorY":0.5,"anchorX":0.5},"compId":5,"child":[{"type":"Image","props":{"y":360,"x":640,"width":400,"skin":"comp/img_blank.png","name":"Page","label":"确定","height":240,"anchorY":0.5,"anchorX":0.5},"compId":6,"child":[{"type":"Label","props":{"y":90,"text":"确定要选择吗？","styleSkin":"comp/image.png","fontSize":20,"color":"#ffffff","centerX":0.5,"anchorY":0.5,"anchorX":0.5},"compId":9},{"type":"Button","props":{"y":160,"var":"yesBtn","skin":"comp/button.png","name":"YesBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"确定","centerX":80,"anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Button","props":{"y":160,"var":"noBtn","skin":"comp/button.png","name":"NoBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"取消","centerX":-80,"anchorY":0.5,"anchorX":0.5},"compId":4}]}]}],"loadList":["comp/img_blank.png","comp/image.png","comp/button.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(ChooseUI.uiView);
        }
    }
    REG("ui.ChooseUI",ChooseUI);
    export class JoystickUI extends Laya.Scene {
		public stickImage:Laya.Image;
		public roundImage:Laya.Image;
        public static  uiView:any ={"type":"Scene","props":{"zOrder":1,"width":1280,"name":"Joystick","mouseThrough":true,"height":720},"compId":2,"child":[{"type":"Image","props":{"width":180,"var":"stickImage","skin":"ui/joystickPoint.png","name":"Stick","left":50,"height":180,"bottom":50,"anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Image","props":{"width":240,"var":"roundImage","skin":"ui/joystickBg.png","name":"Round","left":20,"height":240,"bottom":20,"anchorY":0.5,"anchorX":0.5},"compId":4}],"loadList":["ui/joystickPoint.png","ui/joystickBg.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(JoystickUI.uiView);
        }
    }
    REG("ui.JoystickUI",JoystickUI);
    export class LoadUI extends Laya.Scene {
		public progressBar:Laya.ProgressBar;
		public progressLabel:Laya.Label;
        public static  uiView:any ={"type":"Scene","props":{"width":1280,"name":"Load","height":720},"compId":2,"child":[{"type":"Script","props":{"runtime":"laya.ui.Widget"},"compId":4},{"type":"ProgressBar","props":{"x":640,"width":600,"var":"progressBar","value":0,"skin":"comp/progress.png","sizeGrid":"0,10,0,10","name":"ProgressBar","height":30,"bottom":120,"anchorY":0.5,"anchorX":0.5},"compId":5,"child":[{"type":"Label","props":{"x":300,"var":"progressLabel","text":"0%","name":"ProgressLabel","fontSize":30,"font":"Arial","color":"#ffffff","bottom":0,"anchorY":0.5,"anchorX":0.5},"compId":7}]}],"loadList":["comp/progress.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LoadUI.uiView);
        }
    }
    REG("ui.LoadUI",LoadUI);
    export class LoadingUI extends Laya.Scene {
		public loadingPanel:Laya.Image;
		public loadingImage:Laya.Image;
		public loadingText:laya.display.Text;
        public static  uiView:any ={"type":"Scene","props":{"zOrder":99,"width":1280,"name":"Loading","height":720},"compId":2,"child":[{"type":"Image","props":{"y":360,"x":640,"width":1280,"var":"loadingPanel","skin":"comp/img_blank.png","name":"LoadingPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":3,"child":[{"type":"Image","props":{"y":360,"x":640,"width":100,"var":"loadingImage","skin":"ui/loading.png","name":"LoadingImage","height":100,"anchorY":0.5,"anchorX":0.5},"compId":39},{"type":"Text","props":{"y":420,"x":598,"var":"loadingText","text":"加载中...","pivotY":0.5,"pivotX":0.5,"name":"LoadingText","fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":40}]}],"loadList":["comp/img_blank.png","ui/loading.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LoadingUI.uiView);
        }
    }
    REG("ui.LoadingUI",LoadingUI);
    export class LobbyUI extends Laya.Scene {
		public signBtn:Laya.Button;
		public matchBtn:Laya.Button;
		public nickNameText:laya.display.Text;
		public registerPanel:Laya.Image;
		public nicknameInput:Laya.TextInput;
		public passwordInput:Laya.TextInput;
		public password2Input:Laya.TextInput;
		public registerBtn:Laya.Button;
		public goLoginBtn:Laya.Label;
		public loginPanel:Laya.Image;
		public loginNickname:Laya.TextInput;
		public loginPassword:Laya.TextInput;
		public loginBtn:Laya.Button;
		public goRegisterBtn:Laya.Label;
		public awardPanel:Laya.Image;
		public closeAwardBtn:Laya.Label;
		public matchPanel:Laya.Image;
		public matchText:Laya.Label;
		public cancelMatchBtn:Laya.Button;
        public static  uiView:any ={"type":"Scene","props":{"width":1280,"name":"Lobby","height":720},"compId":2,"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"laya.ui.Widget"},"compId":5},{"type":"Clip","props":{"y":361,"x":0,"skin":"ui/bg2.jpg","scaleY":1.26,"scaleX":1.26,"name":"Background","clipWidth":1015,"anchorY":0.5},"compId":44},{"type":"Button","props":{"x":1191,"var":"signBtn","skin":"comp/button.png","name":"Sign","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"签到","centerY":-318,"anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Button","props":{"y":670,"x":1191,"var":"matchBtn","skin":"comp/button.png","name":"Match","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"匹配","anchorY":0.5,"anchorX":0.5},"compId":4},{"type":"Image","props":{"y":360,"x":640,"width":1280,"name":"UserPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":22,"child":[{"type":"Image","props":{"y":20,"width":80,"skin":"comp/img_bg5.png","sizeGrid":"10,10,10,10","name":"HeadImg","left":20,"height":80},"compId":23,"child":[{"type":"Text","props":{"y":10,"x":100,"var":"nickNameText","text":"用户昵称","name":"NickName","fontSize":22,"color":"#ffffff","runtime":"laya.display.Text"},"compId":24}]}]},{"type":"Image","props":{"y":360,"x":640,"width":1280,"var":"registerPanel","skin":"comp/img_blank.png","name":"RegisterPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":9,"child":[{"type":"Image","props":{"y":363,"x":640,"width":640,"skin":"comp/img_blank.png","name":"Page","height":360,"anchorY":0.5,"anchorX":0.5},"compId":10,"child":[{"type":"Text","props":{"y":84,"x":150,"text":"用户名","fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":17},{"type":"TextInput","props":{"y":80,"x":240,"width":160,"var":"nicknameInput","valign":"middle","skin":"comp/textinput.png","sizeGrid":"10,10,10,10","name":"NicknameInput","height":30,"fontSize":22,"font":"Arial"},"compId":11,"child":[{"type":"Text","props":{"y":35,"text":"2-12个字符","fontSize":12,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":20}]},{"type":"Text","props":{"y":144,"x":172,"text":"密码","fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":18},{"type":"TextInput","props":{"y":140,"x":240,"width":160,"var":"passwordInput","valign":"middle","skin":"comp/textinput.png","sizeGrid":"10,10,10,10","name":"Password","height":30,"fontSize":22,"font":"Arial"},"compId":12,"child":[{"type":"Text","props":{"y":35,"x":0,"text":"6-16个字符","fontSize":12,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":21}]},{"type":"Text","props":{"y":204,"x":128,"text":"确认密码","fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":19},{"type":"TextInput","props":{"y":200,"x":240,"width":160,"var":"password2Input","valign":"middle","skin":"comp/textinput.png","sizeGrid":"10,10,10,10","name":"Password2","height":30,"fontSize":22,"font":"Arial"},"compId":16},{"type":"Button","props":{"y":280,"x":320,"width":160,"var":"registerBtn","skin":"comp/button.png","sizeGrid":"10,10,10,10","name":"RegisterBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"立即注册","height":40,"anchorY":0.5,"anchorX":0.5},"compId":13},{"type":"Label","props":{"width":160,"var":"goLoginBtn","valign":"middle","text":"去登陆","styleSkin":"comp/button.png","sizeGrid":"10,10,10,10","right":0,"name":"GoLoginBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"去登陆","height":40,"fontSize":22,"color":"#ffffff","bottom":0,"anchorY":1,"anchorX":1,"align":"center"},"compId":62}]}]},{"type":"Image","props":{"y":360,"x":640,"width":1280,"var":"loginPanel","skin":"comp/img_blank.png","name":"LoginPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":51,"child":[{"type":"Image","props":{"y":363,"x":640,"width":640,"skin":"comp/img_blank.png","name":"Page","height":360,"anchorY":0.5,"anchorX":0.5},"compId":52,"child":[{"type":"Text","props":{"y":84,"x":150,"text":"用户名","fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":53},{"type":"TextInput","props":{"y":80,"x":240,"width":160,"var":"loginNickname","valign":"middle","skin":"comp/textinput.png","sizeGrid":"10,10,10,10","name":"LoginNickname","height":30,"fontSize":22,"font":"Arial"},"compId":54,"child":[{"type":"Text","props":{"y":35,"text":"2-12个字符","fontSize":12,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":55}]},{"type":"Text","props":{"y":144,"x":172,"text":"密码","fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":56},{"type":"TextInput","props":{"y":140,"x":240,"width":160,"var":"loginPassword","valign":"middle","skin":"comp/textinput.png","sizeGrid":"10,10,10,10","name":"LoginPassword","height":30,"fontSize":22,"font":"Arial"},"compId":57,"child":[{"type":"Text","props":{"y":35,"x":0,"text":"6-16个字符","fontSize":12,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":58}]},{"type":"Button","props":{"y":280,"x":320,"width":160,"var":"loginBtn","skin":"comp/button.png","sizeGrid":"10,10,10,10","name":"LoginBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"立即登录","height":40,"anchorY":0.5,"anchorX":0.5},"compId":61},{"type":"Label","props":{"width":160,"var":"goRegisterBtn","valign":"middle","text":"去注册","styleSkin":"comp/button.png","sizeGrid":"10,10,10,10","right":0,"name":"GoRegisterBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"去登陆","height":40,"fontSize":22,"color":"#ffffff","bottom":0,"anchorY":1,"anchorX":1,"align":"center"},"compId":63}]}]},{"type":"Image","props":{"zOrder":1,"y":360,"x":640,"width":1280,"var":"awardPanel","skin":"comp/img_blank.png","name":"AwardPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":25,"child":[{"type":"Image","props":{"y":360,"x":640,"width":320,"skin":"comp/img_blank.png","name":"Page","height":360,"anchorY":0.5,"anchorX":0.5},"compId":26,"child":[{"type":"Text","props":{"y":40,"x":116,"text":"恭喜获得","pivotX":0.5,"fontSize":22,"color":"#ffffff","align":"center","runtime":"laya.display.Text"},"compId":27},{"type":"Image","props":{"y":100,"x":110,"width":100,"skin":"comp/img_bg4.png","sizeGrid":"10,10,10,10","name":"AwardImg","height":100},"compId":37},{"type":"Button","props":{"y":260,"width":160,"skin":"comp/button.png","sizeGrid":"10,10,10,10","name":"Register","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"领取双倍","height":40,"centerX":1,"anchorY":0.5,"anchorX":0.5},"compId":35},{"type":"Label","props":{"y":313,"x":160,"var":"closeAwardBtn","text":"直接关闭","name":"CloseAward","fontSize":14,"color":"#ffffff","centerX":1,"bottom":40,"anchorY":0.5,"anchorX":0.5,"align":"center"},"compId":36}]}]},{"type":"Image","props":{"zOrder":1,"y":360,"x":640,"width":1280,"var":"matchPanel","skin":"comp/img_blank.png","name":"MatchPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":45,"child":[{"type":"Image","props":{"y":360,"x":640,"width":320,"skin":"comp/img_blank.png","name":"Page","height":240,"anchorY":0.5,"anchorX":0.5},"compId":46,"child":[{"type":"Label","props":{"y":80,"x":127,"var":"matchText","text":"匹配中","pivotY":0.5,"name":"MatchText","fontSize":22,"color":"#ffffff"},"compId":47},{"type":"Button","props":{"y":160,"width":160,"var":"cancelMatchBtn","skin":"comp/button.png","sizeGrid":"10,10,10,10","name":"CancelMatchBtn","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"取消匹配","height":40,"centerX":1,"anchorY":0.5,"anchorX":0.5},"compId":49}]}]}],"loadList":["ui/bg2.jpg","comp/button.png","comp/img_bg5.png","comp/img_blank.png","comp/textinput.png","comp/img_bg4.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LobbyUI.uiView);
        }
    }
    REG("ui.LobbyUI",LobbyUI);
    export class MatchUI extends Laya.Scene {
		public exitBtn:Laya.Button;
		public leftHPPanel:Laya.Image;
		public name0Text:Laya.Label;
		public fillImage:Laya.Clip;
		public hp0Text:Laya.Label;
		public rightHPPanel:Laya.Image;
		public name1Text:Laya.Label;
		public hp1Text:Laya.Label;
        public static  uiView:any ={"type":"Scene","props":{"width":1280,"name":"Main","height":720},"compId":2,"child":[{"type":"Script","props":{"y":0,"x":0,"top":0,"right":0,"left":0,"bottom":0,"runtime":"laya.ui.Widget"},"compId":51},{"type":"Script","props":{"y":0,"x":0,"logNode":"@node:71","gamePad":"@node:41","runtime":"scripts/LogManager.ts"},"compId":72},{"type":"Sprite","props":{"name":"Viewport"},"compId":19,"child":[{"type":"Text","props":{"x":100,"presetID":1,"y":0,"width":1080,"text":"log","name":"Console","isPresetRoot":true,"height":720,"fontSize":16,"color":"#ff0400","runtime":"laya.display.Text"},"compId":71}]},{"type":"Image","props":{"width":240,"skin":"ui/joystickBg.png","right":50,"pivotY":120,"pivotX":120,"name":"GamePad","height":240,"bottom":57},"compId":41,"child":[{"type":"Image","props":{"y":50,"x":120,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Jump","labelSize":30,"label":"跳跃","height":100,"anchorY":0.5,"anchorX":0.5},"compId":21},{"type":"Image","props":{"y":120,"x":50,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Defend","labelSize":30,"label":"防御","height":100,"anchorY":0.5,"anchorX":0.5},"compId":22},{"type":"Image","props":{"y":120,"x":190,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Kick","labelSize":30,"label":"踢腿","height":100,"anchorY":0.5,"anchorX":0.5},"compId":23},{"type":"Image","props":{"y":190,"x":120,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Fist","labelSize":30,"label":"重拳","height":100,"anchorY":0.5,"anchorX":0.5},"compId":24}]},{"type":"Button","props":{"var":"exitBtn","skin":"comp/button.png","name":"Exit","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"离开"},"compId":73},{"type":"Label","props":{"y":65,"x":640,"text":"VS","styleSkin":"comp/button.png","name":"VS","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"离开","fontSize":44,"color":"#ffcc00","anchorY":0.5,"anchorX":0.5},"compId":84},{"type":"Image","props":{"y":360,"x":640,"width":1280,"var":"leftHPPanel","name":"LeftHPPanel","height":720,"clipWidth":10,"anchorY":0.5,"anchorX":0.5},"compId":79,"child":[{"type":"Label","props":{"y":40,"x":200,"var":"name0Text","text":"Player0","styleSkin":"comp/label.png","name":"Name0Text","fontSize":22,"color":"#ffffff","anchorY":0.5,"anchorX":0},"compId":82},{"type":"Image","props":{"y":16,"width":310,"top":50,"skin":"comp/progress$bar.png","sizeGrid":"10,10,10,10","name":"Background","left":200,"height":32,"clipWidth":10,"anchorY":0.5},"compId":77,"child":[{"type":"Clip","props":{"y":16,"x":5,"width":300,"var":"fillImage","skin":"comp/progress.png","sizeGrid":"10,10,10,10","name":"FillImage","height":24,"anchorY":0.5,"anchorX":0},"compId":78},{"type":"Label","props":{"var":"hp0Text","text":"300","styleSkin":"comp/label.png","name":"HP0Text","fontSize":24,"color":"#ff0400","centerY":0.5,"centerX":0.5,"anchorY":0.5,"anchorX":0.5,"align":"right"},"compId":83}]}]},{"type":"Image","props":{"y":360,"x":640,"width":1280,"var":"rightHPPanel","name":"RightHPPanel","height":720,"clipWidth":10,"anchorY":0.5,"anchorX":0.5},"compId":85,"child":[{"type":"Label","props":{"var":"name1Text","top":30,"text":"Player1","styleSkin":"comp/label.png","right":200,"name":"Name1Text","fontSize":22,"color":"#ffffff","anchorY":0.5,"anchorX":1},"compId":86},{"type":"Image","props":{"width":310,"top":50,"skin":"comp/progress$bar.png","sizeGrid":"10,10,10,10","right":200,"name":"Background","height":32,"clipWidth":10,"anchorY":0.5,"anchorX":1},"compId":88,"child":[{"type":"Clip","props":{"y":16,"x":305,"width":300,"skin":"comp/progress.png","sizeGrid":"10,10,10,10","name":"FillImage","height":24,"anchorY":0.5,"anchorX":1},"compId":89},{"type":"Label","props":{"var":"hp1Text","text":"300","styleSkin":"comp/label.png","name":"HP1Text","fontSize":24,"color":"#ff0400","centerY":0.5,"centerX":0.5,"anchorY":0.5,"anchorX":0.5},"compId":87}]}]}],"loadList":["prefab/Console.prefab","ui/joystickBg.png","ui/joystickPoint.png","comp/button.png","comp/label.png","comp/progress$bar.png","comp/progress.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(MatchUI.uiView);
        }
    }
    REG("ui.MatchUI",MatchUI);
    export class TipsUI extends Laya.Scene {
		public bgImage:Laya.Image;
		public messageText:Laya.Label;
        public static  uiView:any ={"type":"Scene","props":{"width":1280,"name":"Tips","height":720},"compId":2,"child":[{"type":"Image","props":{"zOrder":99,"y":360,"x":640,"width":1280,"name":"TipsPanel","height":720,"anchorY":0.5,"anchorX":0.5},"compId":4,"child":[{"type":"Image","props":{"y":360,"x":640,"width":150,"var":"bgImage","text":"消息提示","skin":"comp/img_blank.png","name":"Background","height":50,"fontSize":22,"color":"#ffffff","anchorY":0.5,"anchorX":0.5},"compId":6,"child":[{"type":"Label","props":{"y":26,"x":76,"var":"messageText","text":"消息提示","name":"MessageText","fontSize":22,"color":"#ffffff","centerY":0.5,"centerX":0.5,"anchorY":0.5,"anchorX":0.5},"compId":5}]}]}],"loadList":["comp/img_blank.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(TipsUI.uiView);
        }
    }
    REG("ui.TipsUI",TipsUI);
}