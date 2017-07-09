module wanRenDouNiu {
	export class BullChatSys {
		public constructor(view: BullChatView) {
			this._view = view;
			this.build();
		}
		private _view: BullChatView;
		private _chatSendButton: eui.Image;

		private _chatGroup: eui.Group;
		private _chatInfoGroup: eui.Group;
		private _chatInput: eui.TextInput;
		private _chatInfoScroller: eui.Scroller;

		private _chatTaps: Array<eui.Image>;
		private _chatGroupArr: Array<eui.Group>;
		private _chatScrollerArr: Array<eui.Scroller>;

		private _chatArr: Array<BullChatInfoItem>;

		private _wzCacheArr: Array<any>;

		public build() {
			this._wzCacheArr = new Array<any>();

			this._chatGroup = this._view["chatGroup"];
			this._chatInfoGroup = new eui.Group();
			this._chatInput = this._view["chatInput"];
			this._chatInput.textColor = 0x000000;

			this._chatSendButton = this._view["chatSendButton"];

			this._chatTaps = new Array<eui.Image>();
			this._chatGroupArr = new Array<eui.Group>();
			this._chatScrollerArr = new Array<eui.Scroller>();
			for (var i: number = 0; i < 2; i++) {
				this._chatGroupArr[i] = this._view["group_" + i];
				this._chatScrollerArr[i] = this._view["scroller_" + i];
				this._chatTaps[i] = this._view["chatTap_" + i];
			}

			this._chatGroupArr[1].visible = false;

			var bqGroup = new eui.Group();
			for (var i: number = 1; i < 15; i++) {
				var bqItem = new ChatFaceItem("chat_" + i + "_png");
				bqGroup.addChild(bqItem);
				bqItem.width = 75;
				bqItem.height = 67;
				var col: number = (i - 1) % 3;
				var row: number = Math.floor((i - 1) / 3);
				bqItem.x = col * (bqItem.width + 20) + 30;
				bqItem.y = row * bqItem.height;
			}

			this._chatScrollerArr[0].viewport = bqGroup;

			var wzGroup: eui.Group = new eui.Group();
			var infos = ["在充三万又何妨", "在充三千又何妨", "在充三十万又何妨", "在充三亿万又何妨", "在充三百又何妨", "在充三十亿又何妨"];
			for (var i: number = 0; i < infos.length; i++) {
				var item = new ChatItem();
				wzGroup.addChild(item);
				item.txtInfoLabel.text = infos[i];
				item.y = i * item.height + 10;
			}

			//自定义文字信息
			var wzStr = egret.localStorage.getItem("wz");
			if (wzStr) {
				this._wzCacheArr = JSON.parse(wzStr);
			}
			for (var i: number = 0; i < this._wzCacheArr.length; i++) {
				var item = new ChatItem();
				wzGroup.addChild(this._wzCacheArr[i]);
				item.txtInfoLabel.text = this._wzCacheArr[i];
				item.y = i * item.height + 10;
			}

			this._chatScrollerArr[1].viewport = wzGroup;

			// this._chatArr = new Array<BullChatInfoItem>();
			this.addEvent();
		}
		public addEvent() {
			for (var i: number = 0; i < this._chatTaps.length; i++) {
				this._chatTaps[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChatTap, this);
			}

			// this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchView, this);
			this._chatSendButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChatSend, this);
			// this._chatButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChat, this);

			// var chatModel = chat.ChatControl.instance.chatModel;
			// chatModel.addEventListener(chat.ChatCMD.PUBLIC_MSG, this._chatPublicMsg, this);
		}
		public removeEvent() {
			this._chatSendButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChatSend, this);


		}

		//点击切换
		private _touchChatTap(e: egret.TouchEvent) {
			var ix = this._chatTaps.indexOf(e.currentTarget);
			for (var i: number = 0; i < this._chatGroupArr.length; i++) {
				if (i == ix) {
					this._chatGroupArr[i].visible = true;
					this._chatTaps[i].source = "chat_" + i + "_0_png";
				} else {
					this._chatGroupArr[i].visible = false;
					this._chatTaps[i].source = "chat_" + i + "_1_png";
				}
			}
		}

		private _touchChat(e: egret.TouchEvent) {
			this._chatGroup.visible = true;
		}

		//点击发送
		private _touchChatSend(e: egret.TouchEvent) {
			var str = "wz|" + this._chatInput.text;// "wz|这里是聊天内容";
			if (str.length <= 0) {
				new popup.PromptPopup().showSimple["请输入内容"];
				return;
			}
			// chat.ChatControl.instance.send_public_msg(str);
			var info = { "3": "xxxxx", "4": "vvvvv", "0": str, "27": "1", "28": "10" };
			chat.ChatControl.instance.chat_public_msg(info);
		}
		// /**
		//  * 得到消息
		//  */
		// private _chatPublicMsg(e: GameEvent) {
		// 	// this._view.visible = false;

		// 	this._chatGroup.visible = false;
		// 	var chatModel: chat.ChatModel = e.data;

		// 	var item = new BullChatInfoItem();
		// 	this._chatInfoGroup.addChild(item);
		// 	item.addEventListener("DESTROY_CHAT_ITEM", this._destroyChatItem, this);
		// 	item.update(chatModel);
		// 	this._chatArr.push(item);
		// 	if (this._chatArr.length > 4) {
		// 		var item1 = this._chatArr.shift();
		// 		item1.removeEventListener("DESTROY_CHAT_ITEM", this._destroyChatItem, this);
		// 		item1.destroy();
		// 	}
		// 	this._updatePos();
		// }
		// private _updatePos() {
		// 	var h = 0;
		// 	for (var i: number = 0; i < this._chatArr.length; i++) {
		// 		this._chatArr[i].y = h;
		// 		h += this._chatArr[i].height;
		// 	}
		// }
		// private _destroyChatItem(e: GameEvent) {
		// 	var item1: BullChatInfoItem = e.data;
		// 	var ix = this._chatArr.indexOf(item1);
		// 	if (ix >= 0) {
		// 		var item = this._chatArr[ix];
		// 		item.removeEventListener("DESTROY_CHAT_ITEM", this._destroyChatItem, this);
		// 		item.destroy();
		// 		this._chatArr.splice(ix, 1);
		// 	}
		// 	this._updatePos();
		// }
		public destroy() {
			this.removeEvent();
			this._view = null;
		}

	}
}