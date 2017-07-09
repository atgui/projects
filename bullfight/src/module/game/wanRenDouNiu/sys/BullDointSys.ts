module wanRenDouNiu {
	/**
	 * 发牌
	 */
	export class BullDointSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}
		private _view: WanRenDouNiuView;
		private _cardItems: Array<CardItem>;
		private _zCardResult: CardResultItem;

		private _isCanBet: boolean = false;
		private _cards: Array<eui.Image>;//25张牌


		public build() {
			this._cardItems = this._view.cardItems;
			this._zCardResult = this._view.zCardItem;

			this._cards = new Array<eui.Image>();
			for (var i: number = 0; i < 25; i++) {
				var img = new eui.Image();
				var img = new eui.Image();
				img.source = "card_bg_png";
				this._view.addChild(img);
				img.visible = false;
				this._cards.push(img);
			}
			this.addEvent();
		}

		public addEvent() {
			var bModel = BullControl.instance.BullModel;
			bModel.addEventListener(BullCMD.BULL_DOING, this._bullDoint, this);
		}
		public removeEvent() {
			var bModel = BullControl.instance.BullModel;
			bModel.removeEventListener(BullCMD.BULL_DOING, this._bullDoint, this);
		}

		public init() {
			for (var i: number = 0; i < this._cards.length; i++) {
				this._cards[i].x = 0;// this._view.width / 2 - this._cards[i].width / 2;
				this._cards[i].y = 150;// this._view.scaleGroup.height / 2;
				this._cards[i].scaleX = 0.1;
				this._cards[i].scaleY = 0.1;
			}
			var arr = this._view._bullChipSys.chips;
			for (var i: number = arr.length - 1; i >= 0; i--) {
				for (var j: number = arr[i].length - 1; j >= 0; j--) {
					if (arr[i][j] && arr[i][j].parent) {
						arr[i][j].parent.removeChild(arr[i][j].parent);
					}
					arr[i].splice(j, 1);
				}
				arr.splice(i, 1);
			}

			this._view._bullChipSys.init();
			
		}

		/**
		 * 发牌
		 */
		private _bullDoint(e: GameEvent) {
			this._zCardResult.hide();
			for (var i: number = 0; i < this._cardItems.length; i++) {
				this._cardItems[i].init();
			}
			this.init();
			PopupManager.instance.delAllPop();
			this.start();
		}

		private _animationSys: common.AnimationSys;
		private __time1: number;
		public start() {
			var cardIndex: number = 0;
			var __self = this;
			var cArr = this._cards;
			for (var i: number = 0; i < cArr.length; i++) {
				(function (j) {
					__self.__time1 = setTimeout(function () {
						var cardItemIndex: number = j % 5;
						var item = __self._zCardResult;
						var cardImage;
						if (cardItemIndex % 5 == 0) {//庄
							if (j != 0) {
								cardIndex++;
							}
							cardImage = __self._zCardResult.cards[cardIndex];
						} else {//闲
							var ix = cardItemIndex - 1;
							var cardItem = __self._cardItems[ix];
							cardImage = cardItem.getCardByIndex(cardIndex);
							item = cardItem.cardResultItem;
						}
						cArr[j].visible = true;
						__self.lsRun({ img: cArr[j], cardIndex: cardIndex, cardResultItem: item, cardImage: cardImage });
					}, j * 150);
				})(i);
			}
		}


		//发第几张牌
		public lsRun(obj) {
			var cardImage = obj.cardImage;
			var cardResultItem: CardResultItem = obj.cardResultItem;
			var cardIndex = obj.cardIndex;
			var img = obj.img;

			var endPoint = cardImage.parent.localToGlobal(cardImage.x, cardImage.y);
			var __self = this;
			// SoundManager.instance.licensing1();
			EffectUtils.startBetEff2(img, endPoint, () => {
				cardResultItem.showCardBg(cardIndex);
				if (img && img.parent) {
					img.visible = false;
				}
			}, __self, 0.3);
		}

		public destroy() {
			clearTimeout(this.__time1);
			this.removeEvent();
			this._view = null;
		}
	}
}