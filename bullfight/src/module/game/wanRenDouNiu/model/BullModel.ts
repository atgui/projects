module wanRenDouNiu {
	export class BullModel extends GameDispatcher {
		public constructor() {
			super();
			this.canBet = false;
			this.mstersList=new Array<any>();
			this.minNeedScore=0;
		}
		/**
		 * 自己的下注列表
		 */
		public myBetList: Array<any>;
		/**
		 * 自己已下注总金额
		 */
		public myBetTotalScore: number;
		/**
		 * 当前能下注的封顶
		 */
		public myBetTopScore: number;
		/**
		 * 当前上庄者数据
		 */
		public gameMsters: any;
		/**
		 * 斗牛桌面所有下注金额
		 */
		public gameBetTotal: number;
		/**
		 * 斗牛桌面总下注手数
		 */
		public gameBuyCount: number;
		/**
		 * 路单数据  0 是最老的   尾部是最新的
		 */
		public histroyArr: Array<Array<boolean>>;

		/**
		 * 上庄的最低金额
		 */
		public minNeedScore:number;
		/**
		 * 当前上庄列表
		 */
		public mstersList:Array<any>;




		//========================各种开关--=========================

		/**
		 * 当前状态能否下注
		 */
		public canBet: boolean;

	}
}