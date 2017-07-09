module hall {
	export class MailContenPopup extends popup.PopupBase {
		public constructor(mmod: common.MailModel) {
			super();
			this._mmod = mmod;
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/MailContenPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private _mmod: common.MailModel;
		private closeBtn: euiExtend.ButtonExtend;//关闭按钮
		private contenLabel: eui.Label;//邮件内容
		private giftGroup: eui.Group;//物品组
		private collectBtn: euiExtend.ButtonExtend;//领取
		public build(): void {
			this.initData();
			this.addEvent();
		}
		private initData() {
			this.contenLabel.text = this._mmod.content;
		}
		public addEvent(): void {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.collectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onCollect, this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		private _onCollect(evt: egret.TouchEvent) {
			HallControl.instance.send_receive_email(this._mmod.id);
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.collectBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onCollect, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}