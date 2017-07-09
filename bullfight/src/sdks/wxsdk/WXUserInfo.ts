module sdks {
	export class WXUserInfo {
		public subscribe: number;
		public openid: string;
		public nickname: string;//昵称
		public sex: number;//性别
		public language: string;
		public city: string;//省
		public province: string;//市
		public country: string;//国籍
		public headimgurl: string;//头像
		public subscribe_time: number;
		public unionid: string;
		public remark: string;
		public groupid: number;
		public constructor() {
		}
	}
}