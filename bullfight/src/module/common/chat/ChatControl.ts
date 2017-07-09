module chat {
	export class ChatControl {
		public constructor() {
		}
		private static _instance: ChatControl;
		public static get instance(): ChatControl {
			this._instance = this._instance || new ChatControl;
			return this._instance
		}

		public chatModel: ChatModel;
		public start() {
			this.chatModel = new ChatModel();
		}
		/**
		 * 请求发送房间内聊天
		 */
		public send_public_msg(str: string) {
			var obj: any = {};
			obj[common.ServerKey.MSG] = str;//聊天内容
			SFSManager.instance.sendExtension(chat.ChatCMD.PUBLIC_MSG, obj);
		}
		/**
		 * 请求获取礼物列表数据
		 */
		public send_gift_list() {
			var obj: any = {};
			SFSManager.instance.sendExtension(chat.ChatCMD.GIFT_LIST, obj);
		}
		/**
		 * 请求赠送玩家礼物
		 */
		public send_give_gift(userName: string, giftId: number) {
			var obj: any = {};
			obj[common.ServerKey.USER_NAME] = userName;//接受礼物的玩家
			obj[common.ServerKey.ID] = giftId;//礼物ID号
			SFSManager.instance.sendExtension(chat.ChatCMD.GIVE_GIFT, obj);
		}


		//==========================从服务器得到======================================
		/**
		 * 请求发送房间内聊天
		 */
		public chat_public_msg(data) {
			var obj: ChatModel = new ChatModel();
			obj.userName = data[common.ServerKey.USER_NAME];//发送者userName
			obj.nickName = data[common.ServerKey.NICK_NAME];//发送者nickName
			obj.msg = data[common.ServerKey.MSG];//聊天内容
			obj.sex = data[common.ServerKey.SEX];//性别
			obj.vip = data[common.ServerKey.VIP];//VIP
			this.chatModel.dispatchEvent(new GameEvent(ChatCMD.PUBLIC_MSG, obj));
		}
		/**
		 * 请求获取礼物列表数据
		 */
		public chat_gift_list(data) {
			var infoArr = data[common.ServerKey.DATA];//礼物列表
			this.chatModel.dispatchEvent(new GameEvent(ChatCMD.GIFT_LIST, infoArr));
		}
		/**
		 * 请求赠送玩家礼物
		 */
		public chat_give_gift(data) {
			var obj: any = new Object();
			obj.id = data[common.ServerKey.ID];//礼物ID号
			obj.userName = data[common.ServerKey.USER_NAME];//接受礼物的玩家
			this.chatModel.dispatchEvent(new GameEvent(ChatCMD.GIVE_GIFT, obj));
		}
	}
}