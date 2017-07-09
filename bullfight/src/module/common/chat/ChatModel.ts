module chat {
	export class ChatModel extends GameDispatcher {
		public constructor() {
			super();
		}
		public userName: string;//用户名
		public nickName:string;//昵称
		public msg: string;//内容
		public sex:number;//性别  0 女  1男  2 系统   
		public vip:number;//vip
	}
	/**
	 * 礼物模型
	 */
	export class GiftModel {
		public goldcoins:number;//金币数
		public id:number;//礼物id
		public name:any;//礼物名
	}
}