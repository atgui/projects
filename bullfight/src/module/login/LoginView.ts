module login {
	export class LoginView extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/login/LoginViewSkin.exml";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
		private _onComplete(): void {
			this.build();
		}
		private loginBtn: euiExtend.ButtonExtend;//立即登陆
		private nameInput: eui.EditableText;
		private passInput: eui.EditableText;
		private footerGroup: eui.Group;

		public build(): void {
			AdaptiveManager.instance.relativeByBottom(this.footerGroup);
			this.addEvent();
			LoginControl.instance.sendConnectSFS();
		}
		public addEvent(): void {
			var loginModel: LoginModel = login.LoginControl.instance.loginModel;
			loginModel.addEventListener(LoginCMD.CONNECT_SUCCESS, this._connectSuccess, this);
			loginModel.addEventListener(LoginCMD.LOGIN_STATE, this._loginSuccess, this);
			loginModel.addEventListener(LoginCMD.JOIN_ROOM, this._joinRoom, this);
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			var loginModel: LoginModel = login.LoginControl.instance.loginModel;
			loginModel.removeEventListener(LoginCMD.CONNECT_SUCCESS, this._connectSuccess, this);
			loginModel.removeEventListener(LoginCMD.LOGIN_STATE, this._loginSuccess, this);
		}
		private _connectSuccess(e: GameEvent) {
			this.nameInput.text = window["userName"];
			this.passInput.text = window["userName"];
			this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchLogin, this);
		}
		private _touchLogin(e: egret.TouchEvent) {
			if (SFSManager.instance.isConnect == true) {
				var username: string = this.nameInput.text;
				var password: string = this.passInput.text;
				LoginControl.instance.sendLogin(username, password);
			} else {
				LoginControl.instance.sendConnectSFS();
			}
		}
		private _touchRegister(e: egret.TouchEvent) {
			var registerPop: login.LoginRegisterPopup = new login.LoginRegisterPopup();
			PopupManager.instance.addPop(registerPop, popup.PopupType.OPEN_HIDE_PREV, true, true, popup.PopupInEffType.SCALE_L_S_L_N);
		}
		private _joinRoom(e: GameEvent) {
			SceneManager.instance.show("wanRenDouNiu");
		}

		//连接成功后
		private _loginSuccess(e: GameEvent) {
			var loginModel: LoginModel = login.LoginControl.instance.loginModel;
			if (loginModel.loginSuccess == true) {
				// SceneManager.instance.show("wanRenDouNiu");
				var obj: any = {};
				obj[common.ServerKey.USER_NAME] = "";//Bull
				SFSManager.instance.sendExtension(wanRenDouNiu.BullCMD.JOIN_BULL, obj);
			}
		}

		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}
