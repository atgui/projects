module hall {
	export class HallCMD {
		public constructor() {
		}
		public static HALL_INTOGAME: string = "hall_intoGame";
		//请求获得主页公告信息
		public static ANNOUNCEMENT: string = "19";
		//请求获得排行数据
		public static RANKING: string = "20";
		//请求获得商城数据
		public static SHOPING:string="21";
		//请求获得转盘转奖数据
		public static ROTARY_PRIZE:string="22";
		//请求获邮件列表数据
		public static EMAIL_LIST:string="23";
		//请求领取邮件
		public static RECEIVE_EMAIL:string="24";
		//请求购买钻石
		public static BUY_GOLDBARS:string="30";
		//请求购买筹码
		public static BUY_GOLDCONIS:string="31";
		//请求获取直播列表
		public static LIVE_LIST:string="33";
	}
}