module config {
	/**
	 * 商品配置
	 */
	export class CommodityConfig {
		public constructor() {
		}
		/**
		 * ID
		 */
		public id: string;
		/**
		 * 类型
		 */
		public style: string;
		/**
		 * 名称
		 */
		public name: string;
		/**
		 * 价值
		 */
		public value: string;
		/**
		 * 需要钻石
		 */
		public needDiamond: string;
		/**
		 * 需要金币
		 */
		public needGoldcoins: string;
		/**
		 * 需要人民币
		 */
		public needMoney: string;
		/**
		 * 图标
		 */
		public icon: string;
	}
}