module hall {
	export class GivePopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/GivePopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private closeBtn: euiExtend.ButtonExtend;//关闭按钮
		private idInput: eui.TextInput;//输入框
		private okBtn: euiExtend.ButtonExtend;//确定按钮
		public build(): void {
			this.initData();
			this.addEvent();
		}
		private initData() {

		}
		public addEvent(): void {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onOk, this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		private _onOk(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onOk, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}