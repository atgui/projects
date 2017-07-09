module login {
	export class LoginModel extends GameDispatcher {
		public constructor() {
			super();
		}
		/**
		 * 缓存的用户名
		 */
		public userName: string;
		/**
		 * 缓存的密码
		 */
		public passWord: string;

		/**
		 * 是否连接成功
		 */

		public get connectSuccess(): boolean {
			return this._connectSuccess;
		}

		public set connectSuccess(value: boolean) {
			this._connectSuccess = value;
			this.dispatchEvent(new GameEvent(LoginCMD.CONNECT_SUCCESS))
		}
		private _connectSuccess: boolean;



		/**
		 * 是否登录
		 */
		public get loginSuccess(): boolean {
			return this._loginSuccess;
		}

		public set loginSuccess(value: boolean) {
			this._loginSuccess = value;
			this.dispatchEvent(new GameEvent(LoginCMD.LOGIN_STATE));
		}
		private _loginSuccess: boolean;


		/**
		 * 进入房间
		 */
		public joinRoom() {
			this.dispatchEvent(new GameEvent(LoginCMD.JOIN_ROOM));
		}


	}
}