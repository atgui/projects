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
				this.cards[i].texture = RES.getRes("card_bg_png");
				this.cards[i].visible = false;
			}
			this.niuGroup.visible = false;
			for (var i: number = 0; i < this._timeArr.length; i++) {
				clearTimeout(this._timeArr[i]);
			}
			this._timeArr = [];
		}
		public showCardBg(index: number) {
			if (this.cards[index]) {
				this.cards[index].visible = true;
			}
		}

		public niuImage: eui.Image;
		private _callFun: Function;
		private _evt: any;
		private _timeArr: Array<number> = new Array<number>();


		///显示牛
		public showCardNiu(cgm: CardGroupModel, backFun: Function, evt: any) {
			var __self = this;
			this._callFun = backFun;
			this._evt = evt;
			this._ixxx = 0;
			try {
				for (var i: number = 0; i < this.cards.length - 1; i++) {
					this.cards[i].visible = true;
					(function (j) {
						var arr = [];
						var v: number = j;
						arr.push(__self.cards[j]);
						var t = setTimeout(function () {
							__self._showCard(arr, cgm, v);
						}, j * 50);
						__self._timeArr.push(t);
					})(i);
				}
			} catch (e) {
				// this._callFun.apply(this._evt);
				console.log(e);
			}
		}
		public cardGroup: eui.Group;
		private _ixxx: number = 0;
		/**
		 * 显示一张牌
		 */
		private _showCard(arr: Array<eui.Image>, cgm, v) {
			var __self = this;
			var cgm1 = cgm;
			var gpSP = this.cardGroup;
			EffectUtils.showCard(arr, -30, 0, _showCardComplete1, this);
			function _showCardComplete1() {
				var resStr: string = cgm1.cards[v].bigRes;//"";
				var resStr: string = arr[0].texture = RES.getRes(resStr);
				arr[0].skewY = 30;
				arr[0].scaleX = 0;
				var bomb: game.CardEffMovieClip = new game.CardEffMovieClip(this._cardMcFactory.generateMovieClipData("eff_2"));
				bomb.x = arr[0].x;// - arr[0].width / 2;
				bomb.y = arr[0].y;// - arr[0].height / 2;
				bomb.scaleX = bomb.scaleY = 1;
				gpSP.addChild(bomb);
				EffectUtils.showCard(arr, 0, 1, _showCardComplete2, this);
			}
			function _showCardComplete2() {
				__self._ixxx++;
				if (__self._ixxx == 4) {
					v++;
					var arr1 = [];
					arr1.push(__self.cards[v]);
					setTimeout(function () {
						__self._showCard(arr1, cgm1, v);
					}, 300);
				} else if (__self._ixxx == 5) {
					__self.niuGroup.visible = true;
					__self.niuImage.source = "blnn_ftp_" + cgm.cardStyle + "_png";
					__self.niuImage.scaleX = 2;
					__self.niuImage.scaleY = 2;
					TweenMax.to(__self.niuImage, 0.2, { scaleY: 1, scaleX: 1 });
					SoundManager.instance.playDouNiuResult(cgm1.cardStyle);
					__self._callFun.apply(__self._evt);
				}
			}
		}

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