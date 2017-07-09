module wanRenDouNiu {
	export class CardCountSys {
		public constructor() {
		}

		/**
		 * 为牌组 从大到小排序
		 */
		public sortCard_5(cards: Array<wanRenDouNiu.CardModel>): Array<wanRenDouNiu.CardModel> {
			cards.sort(function (a: wanRenDouNiu.CardModel, b: wanRenDouNiu.CardModel): number {
				return a.value - b.value;
			});
			return cards;
		}


		/**
		 * 检查完后的牌组
		 */
		public resultCards: Array<wanRenDouNiu.CardModel>;
		/**
		 * 检查牌型
		 */
		public checkStyle(cards: Array<wanRenDouNiu.CardModel>): number {
			if (this.checkWuXiaoNiu(cards) == true) {
				return CardStyle.WUXIAONIU;
			} else if (this.checkWuHuaNiu(cards) == true) {
				return CardStyle.WUHUANIU;
			} else if (this.checkSiZha(cards) == true) {
				return CardStyle.SIZHA;
			} else {
				return this.checkNiuJi(cards);
			}
		}


		/**
		 * 检查是否为五小牛
		 */
		public checkWuXiaoNiu(cards: Array<wanRenDouNiu.CardModel>): boolean {
			var boo: boolean = true;
			var i: number = 0;
			var numb: number = 0;
			for (i = 0; i < cards.length; i++) {
				if (cards[i].dianShu >= 5) {
					boo = false;
				}
				numb += cards[i].dianShu;
			}
			if (numb > 10) {
				boo = false;
			}
			this.resultCards = new Array<wanRenDouNiu.CardModel>();
			this.resultCards = cards;
			return boo;
		}

		/**
		 * 检查是否为五花牛
		 */
		public checkWuHuaNiu(cards: Array<wanRenDouNiu.CardModel>): boolean {
			var boo: boolean = true;
			var i: number = 0;
			cards = this.sortCard_5(cards);
			for (i = 0; i < cards.length; i++) {
				if (cards[i].dianShu < 10) {
					boo = false;
				}
			}
			this.resultCards = new Array<wanRenDouNiu.CardModel>();
			this.resultCards = cards;
			return boo;
		}


		/**
		 * 检查是否为四炸
		 */
		public checkSiZha(cards: Array<wanRenDouNiu.CardModel>): boolean {
			var boo: boolean = false;
			cards = this.sortCard_5(cards);
			this.resultCards = new Array<wanRenDouNiu.CardModel>();
			if ((cards[0].dianShu == cards[1].dianShu &&
				cards[0].dianShu == cards[2].dianShu &&
				cards[0].dianShu == cards[3].dianShu)
			) {
				this.resultCards = cards;
				boo = true;
			} else if ((cards[1].dianShu == cards[2].dianShu &&
				cards[1].dianShu == cards[3].dianShu &&
				cards[1].dianShu == cards[4].dianShu)) {
				this.resultCards = cards.splice(1);
				this.resultCards.push(cards[0]);
				boo = true;
			}
			return boo;
		}


		/**
		 * 检查牛几
		 */
		public checkNiuJi(cards: Array<wanRenDouNiu.CardModel>): number {
			var i: number = 0;
			var n: number = 0;
			var copyCards: Array<wanRenDouNiu.CardModel>;
			var copyCards1: Array<wanRenDouNiu.CardModel>;
			var oneCard: wanRenDouNiu.CardModel;
			var cards_2: Array<wanRenDouNiu.CardModel>;
			var cards_3: Array<wanRenDouNiu.CardModel>;
			var styleT: number;
			for (i = 0; i < cards.length - 1; i++) {
				copyCards = ObjectUtils.copyArr(cards);
				oneCard = copyCards.splice(i, 1)[0];
				for (n = i; n < copyCards.length; n++) {
					cards_2 = new Array<wanRenDouNiu.CardModel>();
					cards_3 = new Array<wanRenDouNiu.CardModel>();
					copyCards1 = ObjectUtils.copyArr(copyCards);
					cards_2.push(oneCard);
					cards_2.push(copyCards1.splice(n, 1)[0]);
					cards_3 = copyCards1;
					styleT = this._count_2_3(cards_2, cards_3);
					if (styleT != CardStyle.MEINIU) {
						break;
					}
				}
				if (styleT != CardStyle.MEINIU) {
					break;
				}
			}
			this.resultCards = cards_3;
			this.resultCards = this.resultCards.concat(cards_2);
			return styleT;
		}
		private _count_2_3(cards_2: Array<wanRenDouNiu.CardModel>, cards_3: Array<wanRenDouNiu.CardModel>): number {
			var num3: number = 0;
			var num2: number = 0;
			var styleT: number = 0;
			for (var i: number = 0; i < cards_3.length; i++) {
				var dianshu: number = cards_3[i].dianShu;
				dianshu = dianshu > 10 ? 10 : dianshu;
				num3 += dianshu;
			}
			for (var i: number = 0; i < cards_2.length; i++) {
				var dianshu: number = cards_2[i].dianShu;
				dianshu = dianshu > 10 ? 10 : dianshu;
				num2 += dianshu;
			}
			num2 = num2 % 10;
			if (num3 % 10 == 0) {
				switch (num2) {
					case 0:
						styleT = wanRenDouNiu.CardStyle.NIUNIU;
						break;
					default:
						styleT = wanRenDouNiu.CardStyle["NIU_" + num2];
						break;
				}
			} else {
				styleT = wanRenDouNiu.CardStyle.MEINIU;
			}
			return styleT;
		}





	}
}