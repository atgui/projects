module wanRenDouNiu {
	/**
	 * 排组的模型   斗牛 5张牌
	 */
	export class CardGroupModel {
		/**
		 * 牌组
		 */
		public cards:Array<CardModel>;
		/**
		 * 牌型
		 */
		public cardStyle:number;
		public constructor(arr:Array<string>) {
			this.cards=new Array<CardModel>();
			for(var i:number=0;i<arr.length;i++){
				var str:string=arr[i];
				var strArr:Array<string>= str.split(/_/);
				var mod:CardModel=new CardModel();
				mod.huaSe=parseInt(strArr[0]);
				mod.dianShu=parseInt(strArr[1])+2;
				if(mod.dianShu==14){
					mod.dianShu=1;
				}
				this.cards.push(mod);
			}
			var checkSys:CardCountSys=new CardCountSys();
			this.cardStyle=checkSys.checkStyle(this.cards);
			this.cards=checkSys.resultCards;
		}
	}
}