module config {
	/**
	 * vip成长配置
	 */
	export class GrowthConfig {
		public constructor() {
		}
		/**
		 * id
		 */
		public id:string;
		/**
		 * vip等级
		 */
		public level:string;
		/**
		 * 需要声望值
		 */
		public needReputation:string;
		/**
		 * 每局获得声望点
		 */
		public gainReputation:string;
		/**
		 * 定时奖励金币
		 */
		public gainGold:string;
	}
}