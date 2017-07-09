module common {
	export class CommonControl extends GameDispatcher {
		public constructor() {
			super();
		}
		private static _instance: CommonControl;
		public static get instance(): CommonControl {
			this._instance = this._instance || new CommonControl;
			return this._instance
		}


		public vipSys: VipSys
		public start() {
			this.trumpetStr = "";
			this.vipSys = new VipSys();
		}


		/**
		 * 系统的消息
		 */
		public showServerMsg(data) {
			var str: string = data[common.ServerKey.MSG];
			var popFrame: popup.Prompt3Popup = new popup.Prompt3Popup();
			popFrame.showOneSimple(str);
		}
		/**
		 * 系统的提示
		 */
		public showServerAlert(data) {
			var str: string = data[common.ServerKey.MSG];
			var popFrame: popup.Prompt2Popup = new popup.Prompt2Popup(str, null, null);
		}
		/**
		 * 播放器的提示
		 */
		public showVideoAlert(str: string) {
			var popFrame: popup.Prompt2Popup = new popup.Prompt2Popup(str, null, null);
		}
		/**
		 * 断开连接
		 */
		public netBreak(str: string) {
			var popFrame: popup.Prompt2Popup = new popup.Prompt2Popup(str, this._gotoLogin, this);
		}
		private _gotoLogin() {
			SceneManager.instance.show("login");
		}

		public trumpetStr: string;

		/**
		 * 系统喇叭
		 */
		public trumpet(str: string) {
			this.trumpetStr = str;
			this.dispatchEvent(new GameEvent("trumpet"));
		}




		//=========================发出========================
		/**
		 * 请求获取VIP奖励配置列表
		 */
		public sendVipList() {
			SFSManager.instance.sendExtension(CommonCMD.VIP_LIST, {});
		}
		/**
		 * 请求领取VIP在线奖励
		 */
		public sendReveiceVip() {
			SFSManager.instance.sendExtension(CommonCMD.RECEIVE_VIP, {});
		}
		/**
		 * 请求获取VIP奖励配置列表
		 */
		public sendVipTime() {
			SFSManager.instance.sendExtension(CommonCMD.VIP_TIME, {});
		}
		/**
		 * 请求修改玩家信息
		 */
		public sendModify(obj) {
			SFSManager.instance.sendExtension(CommonCMD.MODIFY, obj);
		}

		//=======================得到===========================
		/**
		 * 请求获取VIP奖励配置列表 得到
		 */
		public common_VipList(data) {
			var infoArr = data[common.ServerKey.DATA];
			this.vipSys.dispatchEvent(new GameEvent(common.CommonCMD.VIP_LIST, infoArr))
		}
		/**
		 * 请求领取VIP在线奖励  得到
		 */
		public common_ReveiceVip(data) {
			this.vipSys.dispatchEvent(new GameEvent(common.CommonCMD.RECEIVE_VIP))
		}
		/**
		 * 请求获取VIP时间 得到
		 */
		public common_VipTime(data) {
			var boo: boolean = data[common.ServerKey.REWARD];
			var time: number = data[common.ServerKey.TIME];
			this.vipSys.countTime = time;
			if (boo == true) {
				this.vipSys.canGet();
			}
		}

		/**
		 * 修改玩家信息
		 */
		public common_Modify(data) {

		}
	}
}