module wanRenDouNiu {
	export class CardResultItem extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			// this.skinName = "skins/bullfight/view/CardResultItemSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}
		public cards: Array<eui.Image>;
		public niuGroup: eui.Group;

		public pointArr: Array<{ x: number, y: number }>;

		private _cardMcFactory: egret.MovieClipDataFactory;
		private _effList: Array<IView>;

		public build(): void {
			this.pointArr = new Array<{ x: number, y: number }>();
			this.cards = new Array<eui.Image>();
			for (var i: number = 0; i < 5; i++) {
				this.cards[i] = this["card_" + i];
				this.pointArr.push({ x: this.cards[i].x, y: this.cards[i].y });
			}
			this._effList = new Array<IView>();
			var data = RES.getRes("winEff_json");
			var txtr = RES.getRes("winEff_png");
			this._cardMcFactory = new egret.MovieClipDataFactory(data, txtr);

			this.hide();
			this.addEvent();
		}
		public addEvent(): void {

		}

		public hide() {
			for (var i: number = 0; i < this.cards.length; i++) {
				this.cards[i].source = "card_bg_png";
				this.cards[i].visible = false;
			}
			this.niuGroup.visible = false;
		}
		public showCardBg(index: number) {
			if (this.cards[index]) {
				this.cards[index].visible = true;
			}
		}

		public niuImage: eui.Image;

		///显示牛
		public showCardNiu(cgm: CardGroupModel) {
			var __self = this;
			var arr = this.cards;
			arr.forEach(function (item) {
				item.visible = true;
			});
			EffectUtils.showCard(arr, -30, 0, showCardComplete1, this);
			var gpSP = this.cardGroup;
			function showCardComplete1() {
				SoundManager.instance.playDouNiuResult(cgm.cardStyle);
				for (var i: number = 0; i < arr.length; i++) {
					var resStr: string = "";
					var resStr: string =
						arr[i].texture = RES.getRes(resStr);
					arr[i].skewY = 30;
					arr[i].scaleX = 0;
					var bomb: game.CardEffMovieClip = new game.CardEffMovieClip(this._cardMcFactory.generateMovieClipData("eff_2"));
					bomb.x = arr[i].x + 10;
					bomb.y = arr[i].y + arr[i].height / 2;
					bomb.scaleX = bomb.scaleY = 1;
					gpSP.addChild(bomb);
				}
				var __self = this;
				EffectUtils.showCard(arr, 0, 1, showCardComplete2, __self);
			}
			function showCardComplete2() {
				for (var i: number = 0; i < arr.length; i++) {
					arr[i].source = cgm.cards[i].bigRes;
				}
				__self.niuGroup.visible = true;
				__self.niuImage.source = "blnn_ftp_" + cgm.cardStyle + "_png";
				__self.niuImage.scaleX = 2;
				__self.niuImage.scaleY = 2;
				TweenMax.to(__self.niuImage, 0.2, { scaleY: 1, scaleX: 1 });
			}
		}
		public cardGroup: eui.Group;

		/**
		 * 亮牌
		 */
		// public showCard(obj: any): void {
		// 	EffectUtils.showCard(this.cards, 0, 1, showCardComplete2, this);
		// 	function showCardComplete2() {
		// 		// this._reportCrad();
		// 	}
		//obj.winScoreList=winScoreList;
		// this._view.myGoldLabel.text = obj.myGold;
		// var seatList: Array<ResultModel> = obj.seatList;
		// var winScoreList: Array<number> = obj.winScoreList;
		//obj.topArr=topArr;
		// for (var i: number = 0; i < this.cards.length; i++) {
		// 	var cardList: eui.Image = this.cards[i];
		// 	// var modList: Array<common.CardModel> = seatList[i].cardModelList;
		// 	var delayTime: number = 1000 * i;
		// 	var idTimeout: number = egret.setTimeout(
		// 		function (dcardList, di, dseatInfo, dwinScoreList) {
		// 			this._flop(dcardList);
		// 		}, this, delayTime, cardList, i, seatList[i], winScoreList
		// 	);
		// }
		// var dTimeout: number = egret.setTimeout(function (dobj) {
		// 	new SettlementPopup(dobj);
		// }, this, 8000, obj
		// );
		// }

		/**
		 * 翻盘
		 **/
		// private _flop(arr: Array<eui.Image>, ) {
		// 	var cardList: Array<eui.Image> = this.cards;// seatInfo.cardModelList;
		// 	EffectUtils.showCard(arr, -30, 0, showCardComplete1, this);
		// 	// var gpSP: eui.Group = this.cardGroup;
		// 	// if (did > 0) {
		// 	// 	gpSP = this.betRegionArr[did - 1].cardGroup;
		// 	// }
		// 	function showCardComplete1() {
		// 		for (var i: number = 0; i < arr.length; i++) {
		// 			var resStr: string = "poker_03_png";//cardList[i].resUrl;
		// 			var resStr: string = arr[i].texture = RES.getRes(resStr);
		// 			arr[i].skewY = 30;
		// 			arr[i].scaleX = 0;
		// 			// var bomb: game.CardEffMovieClip = new game.CardEffMovieClip(this._cardMcFactory.generateMovieClipData("eff_2"));
		// 			// bomb.x = arr[i].x;
		// 			// bomb.y = arr[i].y;
		// 			// bomb.scaleX = bomb.scaleY = 1.5;
		// 			// gpSP.addChild(bomb);
		// 		}
		// 		EffectUtils.showCard(arr, 0, 1, showCardComplete2, this);
		// 	}
		// 	function showCardComplete2() {
		// 		// this._reportCrad();

		// 	}
		// }
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}