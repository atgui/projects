module wanRenDouNiu {
	export class BullChatInfoItem extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/bullfight/view/BullChatInfoItemSkin.exml";
		}
		private _onComplete(e: eui.UIEvent) {
			this.build();
		}
		public chatUserNameLabel: eui.Label;
		public chatInfoLabel: eui.Label;

		public build() {
			this.addEvent();
		}
		public addEvent() {

		}

		public update(chatModel: chat.ChatModel) {
			this.chatUserNameLabel.text = chatModel.nickName + ":";
			var w = this.chatUserNameLabel.x + this.chatUserNameLabel.width;
			if (w > 105) {
				this.chatUserNameLabel.width = 105;
			}
			this.chatInfoLabel.x = this.chatUserNameLabel.x + this.chatUserNameLabel.width;
			var msgArr = chatModel.msg.split("|");
			if (msgArr && msgArr.length > 0) {
				var info = msgArr[0];
				if (info == "bq") {
					var imgSource: string = msgArr[1];
					var img = new eui.Image();
					img.source = imgSource;
					this.addChild(img);
					img.width = 36;
					img.height = 32;
					img.x = this.chatUserNameLabel.x + this.chatUserNameLabel.width;

					this.chatInfoLabel.visible = false;
				} else {
					this.chatInfoLabel.text = msgArr[1];
					this.height += 8;
				}
				this._lsrun();
			} else {
				this.destroy();
			}

		}
		private _time: number;
		private _lsrun() {
			var __self = this;
			this._time = setTimeout(function () {
				__self.dispatchEvent(new GameEvent("DESTROY_CHAT_ITEM", __self));
			}, 10000);
		}

		public removeEvent() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
		}
		public destroy() {
			this.removeEvent();
			clearTimeout(this._time);
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}