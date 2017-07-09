module wanRenDouNiu {
	/**
	 * 结算
	 */
	export class BullResultSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}
		private _view: WanRenDouNiuView;
		private _downTimeLabel: eui.Label;//倒计时
		private _downTimeGroup: eui.Group;//倒计时group
		private _timeInfo: eui.Image;

		private _cardItems: Array<CardItem>;
		private _zCardItem: CardResultItem;

		private _headerIcon: eui.Image;

		public build() {
			this._cardItems = this._view.cardItems;
			this._zCardItem = this._view.zCardItem;
			this._headerIcon = this._view["headerIcon"];
			this._downTimeLabel = this._view["downTimeLabel"]
			this._downTimeGroup = this._view["downTimeGroup"];
			this._timeInfo = this._view["timeInfo"];

			this.addEvent();
		}
		public addEvent() {
			var bModel = BullControl.instance.BullModel;
			bModel.addEventListener(BullCMD.BULL_RESULT, this._bulllResult, this);
		}

		public removeEvent() {
			var bModel = BullControl.instance.BullModel;
			bModel.removeEventListener(BullCMD.BULL_RESULT, this._bulllResult, this);
		}

		private _animationSys: common.AnimationSys;
		/**
		 * 牛牛结果
		 */
		private _bulllResult(e: GameEvent) {
			console.log("开奖:");
			//做开牌动画
			var bsr: common.BullServer_Result = e.data;
			// console.log(bsr);

			this._animationSys = new common.AnimationSys();
			var cgm: CardGroupModel = bsr.getCardListById(0);
			this._animationSys.addFun(this.showNiu, this, { bsr: bsr, ix: 0 });
			this._animationSys.addFun(this.showNiu, this, { bsr: bsr, ix: 1 });

			//金币飞出
			this._animationSys.addFun(this._showResult, this, bsr);
			this._animationSys.addFun(this._clearChips, this);

			var __self = this;
			setTimeout(function () {
				__self._animationSys.next();
				__self._lsRun(bsr.resultTime);
			}, 1000);
		}
		private _endTime: number;
		private _lsRun(time: number) {
			var __self = this;
			this._timeInfo.source = "wr_xxyx_png";
			time--;
			this._endTime = setInterval(function () {
				time--;
				__self._downTimeLabel.text = time + "";
				if (time <= 0) {
					__self._downTimeGroup.visible = false;
					clearInterval(__self._endTime);
				}
			}, 1000);
		}
		private _resultTime: number;
		private _showResult(data: common.BullServer_Result) {
			var __self = this;
			this._resultTime = setTimeout(function () {
				PopupManager.instance.addPop(new SettlementPopup(data));
				__self._animationSys.next();
				__self._downTimeGroup.visible = true;
			}, 3000);
		}
		private _clearChips() {
			var chipsArr: Array<Array<eui.Image>> = this._view._bullChipSys.chips;
			for (var i: number = chipsArr.length - 1; i >= 0; i--) {
				if (chipsArr[i] && chipsArr[i].length > 0) {
					for (var j: number = chipsArr[i].length - 1; j >= 0; j--) {
						if (chipsArr[i][j] && chipsArr[i][j].parent) {
							chipsArr[i][j].parent.removeChild(chipsArr[i][j]);
							chipsArr[i].splice(j, 1);
						}
					}
				}
				chipsArr.splice(i, 1);
			}
		}
		public showNiu(obj: any) {
			var ix: number = obj.ix;
			var bsr: common.BullServer_Result = obj.bsr;
			console.log(bsr);
			if (ix == 0) {//庄
				var cgm: CardGroupModel = bsr.getCardListById(0);
				this._zCardItem.showCardNiu(cgm);
				this._animationSys.next();
			} else {
				var __self = this;
				for (var i: number = 1; i < 5; i++) {
					(function (j) {
						var cgm: CardGroupModel = bsr.getCardListById(j);
						var ix = j - 1;
						var item = __self._cardItems[ix].cardResultItem;
						var tt = setTimeout(function () {
							try {
								item.showCardNiu(cgm);
								var winScore = bsr.aeraWinInfo[ix]["winScore"];
								__self._cardItems[ix].setWin(winScore);
								if (j >= 4) {
									__self._animationSys.next();
								}
							} catch (e) {
								clearTimeout(tt);
							}
						}, j * 900);
					})(i);
				}
			}
		}
		public destroy() {
			this.removeEvent();
			clearInterval(this._endTime);
			clearTimeout(this._resultTime);
			if (this._zCardItem) {
				this._zCardItem.destroy();
			}
			for (var i: number = this._cardItems.length - 1; i >= 0; i--) {
				this._cardItems[i].destroy();
				this._cardItems.splice(i, 1);
			}
			this._cardItems = [];
			this._view = null;
		}
	}
}