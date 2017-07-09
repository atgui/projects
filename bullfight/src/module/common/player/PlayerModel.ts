module player {
	export class PlayerModel extends GameDispatcher {
		public constructor() {
			super();
		}
		/**
		 * ID号
		 */
		public id:string;
		/**
		 * 肖像
		 */
		public portrait:string;
		/**
		 * 性别
		 */
		public sex:string;
		/**
		 * 账户
		 */
		public username:string;
		/**
		 * 密码
		 */
		public password:string;
		/**
		 * 邮箱
		 */
		public email:string;
		/**
		 * 昵称
		 */
		public nickname:string;
		/**
		 * 声望
		 */
		public reputation:string;
		/**
		 * 金币
		 */
		public goldcoins:string;
		/**
		 * 钻石
		 */
		public diamond:string;
		/**
		 * 经验（声望）
		 */
		public experience:number;
		/**
		 * 魅力
		 */
		public charm:string;
		/**
		 * 会员  0 不是vip   1-10  1到10级vip
		 */
		public vip:number;
		/**
		 * 邮件组
		 */
		public emails:any;
		/**
		 * 是否领奖
		 */
		public reward:any;
		/**
		 * 登陆奖励
		 */
		public receive:any;
		/**
		 * 注册时时间
		 */
		public regtime:string;
		/**
		 * 签名
		 */
		public signature:string;
	}
}