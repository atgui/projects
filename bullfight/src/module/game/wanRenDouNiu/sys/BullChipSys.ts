module wanRenDouNiu {
	/**
	 * 下注
	 */
	export class BullChipSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}
		private _view: WanRenDouNiuView;
		private _downTimeLabel: eui.Label;//倒计时
		private _downTimeGroup: eui.Group;//倒计时group
		private _timeInfo: eui.Image;
		private _cardItems: Array<CardItem>;//闲家牌
		private _zCardResult: CardResultItem;//庄家牌

		private _headerIcon: eui.Image;//玩家头像

		public chips: Array<Array<eui.Image>>;//下注的图片
		private _currentBetNum: number;//当前下注筹码默认
		public _chipItemArr: Array<ChipItem>;//筹码图片集合

		private _otherPlayer: eui.Image;
		private _currentItem: ChipItem;

		private _itemChipMaxNumber: number = 100;


		public build() {
			this._isShowTIcon = false
			this.chips = new Array<Array<eui.Image>>();

			this._cardItems = this._view.cardItems;
			this._downTimeLabel = this._view["downTimeLabel"]
			this._downTimeGroup = this._view["downTimeGroup"];
			this._timeInfo = this._view["timeInfo"];

			this._headerIcon = this._view["headerIcon"];
			this._otherPlayer = this._view["otherPlayer"];

			this._chipItemArr = new Array<ChipItem>();
			var chipArr = [10, 30, 50, 100, 300];
			var chipGroup: eui.Group = new eui.Group();
			for (var i: number = 0; i < chipArr.length; i++) {
				var item: ChipItem = this._view["chipItem_" + i];// new ChipItem(chipArr[i], "blackjack_chips_" + chipArr[i] + "_png");
				this._chipItemArr.push(item);
				item.source = "blackjack_chips_" + chipArr[i] + "_png";
				item.chipNum = chipArr[i];
			}

			this._currentBetNum = this._chipItemArr[0].chipNum;
			this._currentItem = this._chipItemArr[0];
			this._currentItem.source = "blackjack_chips_check_" + chipArr[0] + "_png";

			this._downTimeGroup.visible = false;
			this._zCardResult = this._view.zCardItem;

			for (var i: number = 0; i < 5; i++) {
				this._zCardResult.showCardBg(i);
				for (var j: number = 0; j < this._cardItems.length; j++) {
					this._cardItems[j].cardResultItem.showCardBg(i);
				}
			}

			this.addEvent();
		}

		public addEvent() {
			for (var i: number = 0; i < this._chipItemArr.length; i++) {
				this._chipItemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChipItem, this);
			}

			var bModel = BullControl.instance.BullModel;
			bModel.addEventListener(BullCMD.BULL_START_BET, this._bullStartBet, this);
			bModel.addEventListener(BullCMD.BULL_STOP_BET, this._bullStopBet, this);
			bModel.addEventListener(BullCMD.BULL_TIMER, this._bullTimer, this);
			bModel.addEventListener(BullCMD.BULL_DOWNBET, this._bullDownBet, this);
			bModel.addEventListener(BullCMD.BULL_ALL_DOWNBET, this._allDownBet, this);
		}

		public removeEvent() {
			for (var i: number = 0; i < this._chipItemArr.length; i++) {
				this._chipItemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChipItem, this);
			}

			var bModel = BullControl.instance.BullModel;
			bModel.removeEventListener(BullCMD.BULL_START_BET, this._bullStartBet, this);
			bModel.removeEventListener(BullCMD.BULL_STOP_BET, this._bullStopBet, this);
			bModel.removeEventListener(BullCMD.BULL_TIMER, this._bullTimer, this);
			bModel.removeEventListener(BullCMD.BULL_DOWNBET, this._bullDownBet, this);
			bModel.removeEventListener(BullCMD.BULL_ALL_DOWNBET, this._allDownBet, this);
		}
		//所有玩家下注
		private _allDownBet(e: GameEvent) {
			var objList: common.BullServer_bull_all_downbet = e.data;
			// console.log("下注列表");
			console.log(objList);

			var username = player.PlayerControl.instance.mySelf.username;
			//给每个区域赋值
			for (var i: number = 1; i <= 4; i++) {
				this._cardItems[i - 1].setTotalTxt(objList.areaObj[i]);
			}
			var numArr: Array<number> = [0, 0, 0, 0];
			for (var i: number = 0; i < objList.betList.length; i++) {
				var obj = objList.betList[i];
				if (obj["3"] == username) {
					continue;
				}
				var key = obj["1"] - 1;
				numArr[key] += obj["2"];
			}
			var hPoint = this._otherPlayer.parent.localToGlobal(this._otherPlayer.x, this._otherPlayer.y);
			var __self = this;

			console.log(numArr);

			for (var i: number = 0; i < numArr.length; i++) {
				var len = 0;
				if (numArr[i] <= 10 && numArr[i] > 0) {
					len = 2;
				} else if (numArr[i] > 10 && numArr[i] <= 100) {
					len = 3;
				} else if (numArr[i] > 100 && numArr[i] <= 1000) {
					len = 4;
				} else if (numArr[i] > 1000) {
					len = 5;
				}
				(function (l, ix) {
					let lx = l;
					setTimeout(function () {
						__self._createOtherChip(lx, ix, hPoint);
					}, i * 100);
				})(len, i);
			}
		}

		private _createOtherChip(len: number, ix: number, hPoint: { x: number, y: number }) {
			var vPoint = hPoint;//this._otherPlayer.parent.localToGlobal(this._otherPlayer.x, this._otherPlayer.y);
			var __self = this;
			for (var i: number = 0; i < len; i++) {
				(function (j) {
					var tN = setTimeout(function () {
						try {
							var img = new eui.Image();
							img.source = "common_gold_png";
							__self._view.addChild(img);
							img.width = 30;
							img.height = 30;
							img.touchEnabled = false;
							// var key = parseInt(obj.nowBetKey);
							if (!__self.chips[ix]) {
								__self.chips[ix] = new Array<eui.Image>();
							}
							__self.chips[ix].push(img);
							img.x = vPoint.x;
							img.y = vPoint.y;
							__self._chip(img, (ix + 1) + "", __self.destroyImg, __self, ix);
						} catch (e) {
							clearTimeout(tN);
						}
					}, j * 25);
				})(i);
			}
		}

		//点击筹码
		private _touchChipItem(e: egret.TouchEvent) {
			var item: ChipItem = e.currentTarget;
			this._currentBetNum = item.chipNum;
			for (var i: number = 0; i < this._chipItemArr.length; i++) {
				this._chipItemArr[i].source = "blackjack_chips_" + this._chipItemArr[i].chipNum + "_png";
			}
			this._currentItem = item;
			this._currentItem.source = "blackjack_chips_check_" + this._currentBetNum + "_png";
		}

		public init() {
			this._downTimeGroup.visible = false;
			// var item: ChipItem = this._chipItemArr[0];
			// this._currentBetNum = item.chipNum;
			// for (var i: number = 0; i < this._chipItemArr.length; i++) {
			// 	this._chipItemArr[i].source = "blackjack_chips_" + this._chipItemArr[i].chipNum + "_png";
			// }
			// this._currentItem = item;
			// this._currentItem.source = "blackjack_chips_check_" + this._currentBetNum + "_png";
		}


		/**
		 * 得到服务器推送下注信息
		 */
		private _bullDownBet(e: GameEvent) {
			var obj: common.BullServer_BetDownModel = e.data;
			for (var i: number = 0; i < this._cardItems.length; i++) {
				this._cardItems[i].update(obj);
			}

			var mySelf = player.PlayerControl.instance.mySelf;
			var hPoint = this._currentItem.parent.localToGlobal(this._currentItem.x + this._currentItem.width / 2, this._currentItem.y + this._currentItem.height / 2);

			//金币动画
			if (obj.nowBetName != mySelf.username) {//其他人下注
				hPoint = this._otherPlayer.parent.localToGlobal(this._otherPlayer.x, this._otherPlayer.y);
			}
			var toX: number = hPoint.x;
			var toY: number = hPoint.y;

			var __self = this;
			var n: number = parseInt(obj.nowBetNum);
			var nn = NumberUtils.random(0, 3);
			var len = 1;
			switch (n) {
				case 30:
					len = 2;
					break;
				case 50:
					len = 3;
					break;
				case 100:
					len = 4;
					break;
				case 300:
					len = 5;
					break;
			}

			SoundManager.instance.chip1();
			for (var i: number = 0; i < len; i++) {
				(function (j) {
					var tN = setTimeout(function () {
						try {
							var img = new eui.Image();
							img.source = "common_gold_png";
							__self._view.addChild(img);
							img.width = 30;
							img.height = 30;
							img.touchEnabled = false;
							var key = parseInt(obj.nowBetKey);
							if (!__self.chips[key - 1]) {
								__self.chips[key - 1] = new Array<eui.Image>();
							}
							__self.chips[key - 1].push(img);
							img.x = toX;
							img.y = toY;
							__self._chip(img, obj.nowBetKey, __self.destroyImg, __self, key - 1);
						} catch (e) {
							clearTimeout(tN);
						}
					}, j * 25);
				})(i);
			}
		}

		private destroyImg(ix) {
			if (this.chips[ix] && this.chips[ix].length > 0) {
				if (this.chips[ix].length > this._itemChipMaxNumber) {
					var item = this.chips[ix].shift();
					if (item && item.parent) {
						item.parent.removeChild(item);
					}
				}
			}
		}
		public _chip(img: eui.Image, keyStr: string, backFun?: Function, evt?: any, ix?: number) {
			try {
				var key = parseInt(keyStr);
				var cardItem = this._cardItems[key - 1];

				var cPoint = cardItem.parent.localToGlobal(cardItem.x, cardItem.y);
				var minX = 0;
				var maxX = cardItem.chipGroup.width - img.width - 20;
				var toX: number = NumberUtils.random(minX, maxX);

				var minY = 0;
				var maxY = cardItem.chipGroup.height - img.height - 20;
				var toY: number = NumberUtils.random(minY, maxY);

				var X = cPoint.x + toX + 10;
				if (X > cPoint.x + cardItem.chipGroup.width - 25) {
					X = cPoint.x + cardItem.chipGroup.width - 25;
				}
				var Y = cPoint.y + toY + 73;
				if (Y > cPoint.y + 43 + cardItem.chipGroup.height) {
					Y > cPoint.y + 43 + cardItem.chipGroup.height;
				}
				var __self = this;
				EffectUtils.startBetEff1(img, { x: X, y: Y }, () => {
					// cardItem.chip(img, toX, toY);
					if (backFun && evt) {
						backFun.apply(evt, [ix]);
					}
				}, this, 0.5);
			} catch (e) {
				console.log(e);
			}
		}

		//点击下注
		private _touchCardItem(e: egret.TouchEvent) {
			var ix: number = this._cardItems.indexOf(e.currentTarget.parent);
			var keyStr = (ix + 1) + "";
			wanRenDouNiu.BullControl.instance.send_bull_downbet(keyStr, this._currentBetNum);
		}

		private _isBet: boolean = false;

		/**
		 * 下注倒计时
		 */
		private _bullTimer(e: GameEvent) {
			var time = e.data;
			if (this._downTimeGroup.visible == false) {
				this._downTimeGroup.visible = true;
			}
			if (this._isBet == false) {
				this._isBet = true;
				this.betAddEvent();
			}
			this._downTimeLabel.text = Math.abs(time) + "";
			if (this._isShowTIcon == false) {
				for (var i: number = 0; i < this._cardItems.length; i++) {
					this._cardItems[i].showTIcon(true);
				}
			}
		}
		public betAddEvent() {
			for (var i: number = 0; i < this._cardItems.length; i++) {
				this._cardItems[i].chipGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchCardItem, this);
			}
		}
		public betRemoveEvent() {
			for (var i: number = 0; i < this._cardItems.length; i++) {
				this._cardItems[i].chipGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchCardItem, this);
			}
		}

		/**
		 * 停止下注
		 */
		private _bullStopBet(e: GameEvent) {
			this.betRemoveEvent();
			new StopBetMovie();
			this._downTimeGroup.visible = false;
			// this._isBet = false;

			for (var i: number = 0; i < this._cardItems.length; i++) {
				this._cardItems[i].chipGroup.cacheAsBitmap = true;
			}

			SoundManager.instance.playBet(1);
		}

		private _isShowTIcon: boolean;

		//开始下注
		private _bullStartBet(e: GameEvent) {
			new StartBetMovie();

			this.chips = new Array<Array<eui.Image>>();
			this._timeInfo.source = "wr_qxz_png";
			SoundManager.instance.playBet();

			this._isShowTIcon = true;
			for (var i: number = 0; i < this._cardItems.length; i++) {
				this._cardItems[i].showTIcon(true);
			}
			this.betAddEvent();
			// this._downTimeGroup.visible = true;
		}

		public destroy() {
			this.removeEvent();
			for (var i: number = this._chipItemArr.length - 1; i >= 0; i--) {
				if (this._chipItemArr[i] && this._chipItemArr[i].parent) {
					this._chipItemArr[i].parent.removeChild(this._chipItemArr[i]);
				}
				this._chipItemArr.splice(i, 1);
			}
			this._view = null;
		}
	}
}