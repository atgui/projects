module login {
	export class LoginControl {
		public constructor() {
		}

		private static _instance: LoginControl;
		public static get instance(): LoginControl {
			this._instance = this._instance || new LoginControl;
			return this._instance
		}

		public loginModel: login.LoginModel;
		public start() {
			this.loginModel = new login.LoginModel();
		}

		/**
		 * 发出连接SFS请求
		 */
		public sendConnectSFS() {
			//"121.201.68.75", 8888
			// SFSManager.instance.start();
			//192.168.199.237  8888
			SFSManager.instance.start("121.201.68.75", 8888);
		}

		/**
		 * 发出登录请求
		 */
		public sendLogin(userName: string, passWord: string) {
			//userName, passWord, null, "Game"
			// SFSManager.instance.sendLogin("","",null,null);
			SFSManager.instance.sendLogin(userName, passWord, null, "Game");
		}

		/**
		 * 发出加入大厅的Room
		 */
		public joinRoomSuccess() {
			this.loginModel.joinRoom();
		}

	}
}