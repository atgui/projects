module wanRenDouNiu {
	export class ChatItem extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/bullfight/view/ChatItemSkin.exml";
		}
		private _onComplete(e: eui.UIEvent) {
			this.build();
		}

		public txtInfoLabel: eui.Label;

		public build() {

			this.addEvent();
		}
		public addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchThis, this);
		}
		public removeEvent() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
		}

		private _touchThis(e: egret.TouchEvent) {
			var str = "wz|" + this.txtInfoLabel.text;
			// chat.ChatControl.instance.send_public_msg(str);
			var info = { "3": "xxxxx", "4": "vvvvv", "0": str, "27": "1", "28": "10" };
			chat.ChatControl.instance.chat_public_msg(info);
		}

		public destroy() {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}