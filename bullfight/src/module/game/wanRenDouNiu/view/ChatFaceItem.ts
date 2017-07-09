module wanRenDouNiu {
	export class ChatFaceItem extends eui.Image {
		public constructor(n: string) {
			super(n);
			this.faceStr = n;
			this.touchEnabled = true;
			this.build();
		}
		public faceStr: string;
		public build() {
			this.addEvent();
		}
		public addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchThis, this);
		}
		private _touchThis(e: egret.TouchEvent) {
			var str = "bq|" + this.faceStr;
			// chat.ChatControl.instance.send_public_msg(str);
			var info = { "3": "xxxxx", "4": "vvvvv", "0": str, "27": "1", "28": "10" };
			chat.ChatControl.instance.chat_public_msg(info);
		}
	}
}
