module wanRenDouNiu {
	export class CardModel {
		public constructor() {
		}

		/**
		 * id
		 */
		public id: string;
		/**
		 * 牌面大小
		 */
		public value: number;
		/**
		 * 花色 黑桃 3 红桃 2 梅花 1 方块 0
		 * 
		 */
		public huaSe: number;

		/**
		 * 点数 1-13
		 * A、1、2、3、4、5、6、7、8、9、10、J、Q、K
		 * 
		 */
		public dianShu: number;

		/**
		 * 资源路径  大
		 */
		public get bigRes(): string {
			var urlstr: string = "cardmax_" + (this.huaSe + 1) + "_" + this.dianShu + "_png";
			return urlstr;
		}
		/**
		 * 资源路径  小
		 */
		public get smallRes(): string {
			var urlstr: string = "cardmin_" + (this.huaSe + 1) + "_" + this.dianShu + "_png";
			return urlstr;
		}
	}
}