module hall {
	export class MallChipItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/MallChipItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private chipNumLabel: eui.Label;//筹码数
		private buyBtn: euiExtend.ButtonExtend;//购买
		private diamondsLabel: eui.Label;//所需钻石
		public build(): void {
			this.addEvent();
		}
		public dataChanged() {
			var mmod: common.ChipMallModel = this.data;
			this.chipNumLabel.text = mmod.goldcoins + " 筹码";
			this.diamondsLabel.text = mmod.goldbars.toString();
		}
		public addEvent(): void {
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchBuy, this);
		}
		private _onTouchBuy(evt: egret.TouchEvent) {
			var mmod: common.ChipMallModel = this.data;
			hall.HallControl.instance.send_shoping_buy(mmod.id, 2);
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchBuy, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}