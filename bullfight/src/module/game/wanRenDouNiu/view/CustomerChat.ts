module wanRenDouNiu {
	export class CustomerChat extends eui.Component implements IView {
		public constructor() {
			super()
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/bullfight/view/CustomerChatSkin.exml";
		}

		private _onComplete(e: eui.UIEvent) {
			this.build();
		}

		public customerEditableText: eui.EditableText;
		public okButton: eui.Label;
		public closeButton: eui.Image;

		private _arr: Array<any>;

		public build() {
			this._arr = BullControl.instance.cacheArr;
			this.addEvent();
		}
		public addEvent() {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this)
			this.okButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchOkButton, this);
		}
		public removeEvent() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
		}
		private _touchClose(e: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		private _touchOkButton(e: egret.TouchEvent) {
			var str = this.customerEditableText.text;
			if (!str || str.length <= 0) {
				var p = new popup.PromptPopup();
				p.showSimple(["请输入自定义文字"]);
				return;
			}
			if (str.length > 32) {
				var p = new popup.PromptPopup();
				p.showSimple(["最多只能输入32字"]);
				return;
			}
			this._arr.push(str);
			egret.localStorage.setItem("wz_cache", JSON.stringify(this._arr));
			PopupManager.instance.removePop(this);
		}

		public destroy() {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}