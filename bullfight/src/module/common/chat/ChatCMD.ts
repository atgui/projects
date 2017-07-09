module chat {
	export class ChatCMD {
		public constructor() {
		}

		//请求发送房间内聊天
		public static PUBLIC_MSG: string = "26";
		//请求获取礼物列表数据
		public static GIFT_LIST: string = "27";
		//请求赠送玩家礼物
		public static GIVE_GIFT: string = "28";
	}
}