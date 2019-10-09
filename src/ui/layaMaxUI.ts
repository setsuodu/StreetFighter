/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
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
    export class LobbyUI extends Laya.Scene {
		public signBtn:Laya.Button;
		public matchBtn:Laya.Button;
        public static  uiView:any ={"type":"Scene","props":{"width":1280,"name":"Lobby","height":720},"compId":2,"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"laya.ui.Widget"},"compId":5},{"type":"Button","props":{"x":640,"var":"signBtn","skin":"comp/button.png","name":"Sign","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"签到","centerY":100,"anchorY":0.5,"anchorX":0.5},"compId":3},{"type":"Button","props":{"y":359,"x":640,"var":"matchBtn","skin":"comp/button.png","name":"Match","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"匹配","anchorY":0.5,"anchorX":0.5},"compId":4}],"loadList":["comp/button.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(LobbyUI.uiView);
        }
    }
    REG("ui.LobbyUI",LobbyUI);
    export class MainUI extends Laya.Scene {
		public roundImage:Laya.Image;
		public stickImage:Laya.Image;
		public exitBtn:Laya.Button;
        public static  uiView:any ={"type":"Scene","props":{"width":1280,"name":"Main","height":720},"compId":2,"child":[{"type":"Script","props":{"y":0,"x":0,"top":0,"right":0,"left":0,"bottom":0,"runtime":"laya.ui.Widget"},"compId":51},{"type":"Script","props":{"y":0,"x":0,"stickNode":"@node:61","roundNode":"@node:57","runtime":"scripts/JoystickManager.ts"},"compId":68},{"type":"Script","props":{"y":0,"x":0,"logNode":"@node:71","gamePad":"@node:41","runtime":"scripts/LogManager.ts"},"compId":72},{"type":"Sprite","props":{"name":"Viewport"},"compId":19,"child":[{"type":"Text","props":{"text":"左上1","name":"TextUL","fontSize":40,"font":"Arial","color":"#ffffff","runtime":"laya.display.Text"},"compId":4},{"type":"Text","props":{"y":0,"x":1200,"text":"右上","name":"TextUR","fontSize":40,"color":"#ff0400","runtime":"laya.display.Text"},"compId":12},{"type":"Text","props":{"y":680,"x":0,"text":"左下","name":"TextDL","fontSize":40,"color":"#ff0400","runtime":"laya.display.Text"},"compId":14},{"type":"Text","props":{"y":680,"x":1200,"text":"右下","name":"TextDR","fontSize":40,"color":"#ff0400","runtime":"laya.display.Text"},"compId":13},{"type":"Text","props":{"x":100,"presetID":1,"y":0,"width":1080,"text":"log","name":"Console","isPresetRoot":true,"height":720,"fontSize":16,"color":"#ff0400","runtime":"laya.display.Text"},"compId":71}]},{"type":"Image","props":{"y":550,"x":170,"width":240,"visible":false,"skin":"ui/joystickBg.png","pivotY":120,"pivotX":120,"name":"Joystick","height":240},"compId":31,"child":[{"type":"Sprite","props":{"y":40,"x":120,"width":80,"texture":"ui/up.jpg","pivotY":40,"pivotX":40,"name":"Up","height":80},"compId":40},{"type":"Sprite","props":{"y":120,"x":40,"width":80,"texture":"ui/left.jpg","pivotY":40,"pivotX":40,"name":"Left","height":80},"compId":38},{"type":"Sprite","props":{"y":120,"x":200,"width":80,"texture":"ui/right.jpg","pivotY":40,"pivotX":40,"name":"Right","height":80},"compId":39},{"type":"Sprite","props":{"y":200,"x":120,"width":80,"texture":"ui/down.jpg","pivotY":40,"pivotX":40,"name":"Down","height":80},"compId":37}]},{"type":"Image","props":{"width":240,"skin":"ui/joystickBg.png","right":50,"pivotY":120,"pivotX":120,"name":"GamePad","height":240,"bottom":57},"compId":41,"child":[{"type":"Image","props":{"y":50,"x":120,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Jump","labelSize":30,"label":"跳跃","height":100,"anchorY":0.5,"anchorX":0.5},"compId":21},{"type":"Image","props":{"y":120,"x":50,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Defend","labelSize":30,"label":"防御","height":100,"anchorY":0.5,"anchorX":0.5},"compId":22},{"type":"Image","props":{"y":120,"x":190,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Kick","labelSize":30,"label":"踢腿","height":100,"anchorY":0.5,"anchorX":0.5},"compId":23},{"type":"Image","props":{"y":190,"x":120,"width":100,"stateNum":3,"skin":"ui/joystickPoint.png","name":"Fist","labelSize":30,"label":"重拳","height":100,"anchorY":0.5,"anchorX":0.5},"compId":24}]},{"type":"Image","props":{"y":430,"x":170,"width":240,"var":"roundImage","skin":"ui/joystickBg.png","name":"Round","left":50,"height":240,"bottom":50,"anchorY":0.5,"anchorX":0.5},"compId":57},{"type":"Image","props":{"width":180,"var":"stickImage","skin":"ui/joystickPoint.png","name":"Stick","left":80,"height":180,"bottom":80,"anchorY":0.5,"anchorX":0.5},"compId":61},{"type":"Button","props":{"var":"exitBtn","skin":"comp/button.png","name":"Exit","labelStrokeColor":"#ffffff","labelSize":22,"labelColors":"#ffffff","label":"离开"},"compId":73}],"loadList":["prefab/Console.prefab","ui/joystickBg.png","ui/up.jpg","ui/left.jpg","ui/right.jpg","ui/down.jpg","ui/joystickPoint.png","comp/button.png"],"loadList3D":[]};
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.createView(MainUI.uiView);
        }
    }
    REG("ui.MainUI",MainUI);
}