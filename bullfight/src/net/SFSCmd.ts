module net {
	export class SFSCmd {
		public constructor() {
		}
		/**
		 * 链接成功
		 */
		public static CMD_CONNECT_SUCCESS: string = "sfs_connect_success";
		/**
		 * 登录成功
		 */
		public static CMD_LOGIN_SUCCESS: string = "sfs_login_success";
		/**
		 * 加入房间成功
		 */
		public static CMD_JOINROOM_SUCCESS: string = "sfs_joinRoom_success";

		/**
		 * 自定义数据
		 */
		public static CMD_EXTENSION_DATA: string = "sfs_extension_data";
		/**
		 * 提交注册
		 */
		public static CMD_SUBMIT: string = "$SignUp.Submit";
		/**
		 * 密码找回
		 */
		public static CMD_RECOVER: string = "$SignUp.Recover";

		/**
		 * 玩家数据变更
		 */
		public static CMD_PLAYER_UPDATA:string="sfs_player_updata"
	}
}