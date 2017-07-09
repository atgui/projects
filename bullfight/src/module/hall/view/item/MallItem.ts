module hall {
	export class MallItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/MallItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private buyBtn: euiExtend.ButtonExtend;//购买
		private touchBuyImg: eui.Image;
		private diamondNumLabel: eui.Label;//钻石数量
		private prestigeLabel: eui.Label;//获得声望
		private moneyLabel: eui.Label;//钱
		public build(): void {
			this.addEvent();
		}
		public dataChanged() {
			var dmod: common.DiamondsMallModel = this.data;
			this.diamondNumLabel.text = dmod.goldbars + " 钻";
			this.moneyLabel.text = dmod.money + "￥";
			this.prestigeLabel.text = dmod.experience.toString();
		}
		public addEvent(): void {
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBuy, this);
		}
		private _onBuy(evt: egret.TouchEvent) {
			var dmod: common.DiamondsMallModel = this.data;
			hall.HallControl.instance.send_shoping_buy(dmod.id, 1);
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onBuy, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}