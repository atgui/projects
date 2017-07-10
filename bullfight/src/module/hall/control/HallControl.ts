module hall {
	export class HallControl {
		public constructor() {
		}

		private static _instance: HallControl;
		public static get instance(): HallControl {
			this._instance = this._instance || new HallControl;
			return this._instance
		}

		public hallModel: hall.HallModel;
		public start() {
			this.hallModel = new hall.HallModel();
		}

		//====================发出==========================


		/**
		 * 请求获得主播列表
		 */
		public send_anchorlist() {
			var obj: any = {};
			SFSManager.instance.sendExtension(HallCMD.LIVE_LIST, obj);
		}


		/**
		 * 发出加入斗牛
		 */
		// public sendJoinWanRenDouNiu(data: anchor.AnchorRoomModel) {
		// 	var anchorRomm: anchor.AnchorRoomModel = data;
		// 	wanRenDouNiu.BullControl.instance.nowAnchor=anchorRomm;
		// 	SFSManager.instance.sendExtension(wanRenDouNiu.BullCMD.JOIN_BULL, {});
		// }

		/**
		 * 发出获得公告信息
		 */
		public send_announcement() {
			var obj: any = {};
			SFSManager.instance.sendExtension(HallCMD.ANNOUNCEMENT, obj);
		}

		/**
		 * 发出获得排行数据
		 */
		public send_ranking() {
			var obj: any = {};
			SFSManager.instance.sendExtension(HallCMD.RANKING, obj);
		}

		/**
		 * 发出获得商城数据
		 */
		public send_shoping() {
			var obj: any = {};
			SFSManager.instance.sendExtension(HallCMD.SHOPING, obj);
		}
		/**
		 * 商城请求购买
		 * id:购买的id
		 * type:购买钻石（1）还是筹码（2）
		 */
		public send_shoping_buy(id: number, type: number) {
			var obj: any = {};
			obj[common.ServerKey.ID] = id;//商品ID号
			if (type == 1) {
				SFSManager.instance.sendExtension(HallCMD.BUY_GOLDBARS, obj);
			} else if (type == 2) {
				SFSManager.instance.sendExtension(HallCMD.BUY_GOLDCONIS, obj);
			}
		}
		/**
		 * 发出获得转盘转奖数据
		 */
		public send_rotary_prize() {
			var obj: any = {};
			SFSManager.instance.sendExtension(HallCMD.ROTARY_PRIZE, obj);
		}

		/**
		 * 请求获邮件列表数据
		 */
		public send_email_list() {
			var obj: any = {};
			SFSManager.instance.sendExtension(HallCMD.EMAIL_LIST, obj);
		}

		/**
		 * 请求领取邮件
		 */
		public send_receive_email(id: number) {
			var obj: any = {};
			obj[common.ServerKey.ID] = id;//邮件ID号
			SFSManager.instance.sendExtension(HallCMD.RECEIVE_EMAIL, obj);
		}






		//===================服务器反馈的数据===================
		/**
		 * 请求获得主页公告信息
		 */
		public hall_announcement(data) {
			var infoArr = data[common.ServerKey.MSG];
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.ANNOUNCEMENT, infoArr));
		}
		/**
		 * 请求获得排行数据
		 */
		public hall_ranking(data) {
			var coinArr = data[common.ServerKey.RANKING_COINS_LIST];
			var charmArr = data[common.ServerKey.RANKING_CHARM_LIST];
			var obj={coinArr:coinArr,charmArr:charmArr}
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.RANKING, obj));
		}
		/**
		 * 请求获得商城数据
		 */
		public hall_shoping(data) {
			var mmd: common.MallModel = new common.MallModel();
			mmd.dmmodArr = data[common.ServerKey.SHOP_BARS_LIST];//钻石
			mmd.cmmodArr = data[common.ServerKey.SHOP_COINS_LIST];//筹码
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.SHOPING, mmd));
		}
		/**
		 * 请求获得钻石购买数据
		 */
		public hall_shoping_buy_goldbrs(data) {
			var info = data[common.ServerKey.ID];
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.BUY_GOLDBARS, info));
		}
		/**
		 * 请求获得筹码购买数据
		 */
		public hall_shoping_buy_goldcoins(data) {
			var info = data[common.ServerKey.ID];
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.BUY_GOLDCONIS, info));
		}
		/**
		 * 请求获得转盘转奖数据
		 */
		public hall_rotary_prize(data) {
			var infoArr = data[common.ServerKey.DATA];
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.ROTARY_PRIZE, infoArr));
		}
		/**
		 *请求获邮件列表数据
		 */
		public hall_email_List(data) {
			var infoArr = data[common.ServerKey.DATA];
			this.hallModel.dispatchEvent(new GameEvent(HallCMD.EMAIL_LIST, infoArr));
		}
		/**
		 *主播列表
		 */
		// public hall_anchorlist(data) {
		// 	var infoArr: Array<any> = data[common.ServerKey.DATA];
		// 	var anchorList: Array<anchor.AnchorRoomModel> = new Array<anchor.AnchorRoomModel>();
		// 	for (var i: number = 0; i < infoArr.length; i++) {
		// 		anchorList[i] = new anchor.AnchorRoomModel(infoArr[i]);
		// 	}
		// 	this.hallModel.dispatchEvent(new GameEvent(HallCMD.LIVE_LIST, anchorList));
		// }
	}
}