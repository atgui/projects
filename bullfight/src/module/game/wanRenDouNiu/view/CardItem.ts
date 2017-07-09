module wanRenDouNiu {
	export class CardItem extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			// this.skinName = "skins/bullfight/view/CardItemSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}
		public index: number; //下标
		public bg: eui.Image;//背景
		public chipGroup: eui.Group;//筹码显示group

		public mySelfBet: number;//自己的下注
		public myBetBg: eui.Image;
		public totalBetLabel: eui.Label;//总下注
		public mySelfLabel: eui.Label;//自己的下注

		public cardResultItem: CardResultItem;//牌信息
		public tIcon: eui.Image;

		public build(): void {
			this.index = 1;
			this.init();
			this.addEvent();
		}

		public setIndex(ix: number) {
			this.index = ix;
			if (this.index == 1) {
				this.bg.source = "wr_hetao_png";
				this.tIcon.source = "wr_chip_hetao_png";
			} else if (this.index == 2) {
				this.bg.source = "wr_hongtao_png";
				this.tIcon.source = "wr_chip_hongtao_png";
			} else if (this.index == 3) {
				this.bg.source = "wr_meihua_png";
				this.tIcon.source = "wr_chip_meihua_png";
			} else if (this.index == 4) {
				this.bg.source = "wr_fangkuai_png";
				this.tIcon.source = "wr_chip_fangkuai_png";
			}
		}

		public showTIcon(v: boolean) {
			this.tIcon.visible = v;
		}

		public addEvent(): void {

		}
		public winScoreLabel: eui.Label;
		public setWin(winScrore) {
			if (winScrore >= 0) {
				this.bg.source = "wr_sl_png";
				this.winScoreLabel.text = "+" + winScrore;
				this.winScoreLabel.textColor = 0x019917;
			} else {
				this.winScoreLabel.text =winScrore+"";
				this.winScoreLabel.textColor = 0xBAAD8F;
			}
			this.winScoreLabel.visible = this.mySelfLabel.visible;
		}

		public init() {
			this.mySelfBet = 0;
			this.hide();
			this.myBetBg.visible = false;

			this.totalBetLabel.text = "0";
			this.mySelfBet = 0;
			this.mySelfLabel.text = "0";
			this.mySelfLabel.visible = false;
			this.winScoreLabel.text = "0";
			this.winScoreLabel.visible = false;
			this.setIndex(this.index);
		}

		public chip(img: eui.Image, x: number, y: number) {
			this.chipGroup.addChild(img);
			img.x = x;
			img.y = y;
		}
		/**
		 * 更新下注信息
		 */
		public update(data: common.BullServer_BetDownModel) {
			var mySelf = player.PlayerControl.instance.mySelf;
			if (mySelf.username == data.nowBetName && data.nowBetKey == this.index + "") {
				this.mySelfBet += parseInt(data.nowBetNum);
			}
			if (this.mySelfBet > 0) {
				this.myBetBg.visible = this.mySelfLabel.visible = true;
				this.mySelfLabel.text = this.mySelfBet + "";
			}
			this.totalBetLabel.text = "" + data.areaObj[this.index];
		}

		public setTotalTxt(n: number) {
			this.totalBetLabel.text = "" + n;
		}

		private hide() {
			this.cardResultItem.hide();
			this.showTIcon(false);
		}
		/**
		 * 得到对应下标的扑克
		 */
		public getCardByIndex(index: number) {
			var img = this.cardResultItem.cards[index];
			return img;
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