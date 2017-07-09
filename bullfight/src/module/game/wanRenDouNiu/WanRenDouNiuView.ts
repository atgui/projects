module wanRenDouNiu {
	export class WanRenDouNiuView extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/WanRenFightBullViewSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}
		public bg: eui.Image;//背景图

		public topGroup: eui.Group;
		public scaleGroup: eui.Group;
		public footerGroup: eui.Group;

		public sysNoticeLabel: eui.Label;

		public cardItems: Array<CardItem>;
		public zCardItem: CardResultItem;//庄家牌

		public otherPlayer: eui.Image;//其他玩家
		public chatButton: eui.Image;//聊天


		private _updatePlayer: UpdatePlayerSys;
		private _bullDointSys: BullDointSys;
		public _bullChipSys: BullChipSys;
		private _bullResultSys: BullResultSys;
		private _bullMenuSys: BullMenuSys;
		private _bullNoticeSys: BullNoticeSys;
		private _bullChatSys: BullChatSys;
		private _bullUpMasterSys: BullUpMasterSys;

		public build(): void {
			this.cardItems = new Array<CardItem>();
			for (var i: number = 0; i < 4; i++) {
				this.cardItems[i] = this["cardItem_" + i];
				this.cardItems[i].setIndex(i + 1);
			}

			AdaptiveManager.instance.relativeByTop(this.topGroup);
			AdaptiveManager.instance.zoomAndCenter(this.scaleGroup);
			AdaptiveManager.instance.relativeByBottom(this.footerGroup);
			this.chatInfoScroller.viewport = this._chatInfoGroup;
			this.addEvent();
			this._updatePlayer = new UpdatePlayerSys(this);
			this._bullDointSys = new BullDointSys(this);
			this._bullChipSys = new BullChipSys(this);
			this._bullResultSys = new BullResultSys(this);
			this._bullMenuSys = new BullMenuSys(this);
			this._bullNoticeSys = new BullNoticeSys(this);
			// this._bullChatSys = new BullChatSys(this);
			this._bullUpMasterSys = new BullUpMasterSys(this);
		}

		public addEvent(): void {
			this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchView, this);
			this.chatButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChatButton, this);
			this.otherPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchOtherPlayer, this);

			var chatModel = chat.ChatControl.instance.chatModel;
			chatModel.addEventListener(chat.ChatCMD.PUBLIC_MSG, this._chatPublicMsg, this);
		}

		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchView, this);
			this.chatButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchChatButton, this);
			this.otherPlayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchOtherPlayer, this);

			var chatModel = chat.ChatControl.instance.chatModel;
			chatModel.removeEventListener(chat.ChatCMD.PUBLIC_MSG, this._chatPublicMsg, this);
		}

		public chatView: BullChatView;
		private _touchView(e: egret.TouchEvent) {
			if (this.chatView) {
				this.chatView.visible = false;
			}
		}

		private _touchChatButton(e: egret.TouchEvent) {
			if (!this.chatView) {
				this.chatView = new BullChatView();
				this.chatView.visible = false;
			}
			this.chatView.visible = !this.chatView.visible;
		}

		public _chatArr = new Array<BullChatInfoItem>();
		public _chatInfoGroup = new eui.Group();
		public chatInfoScroller: eui.Scroller;

		/**
		 * 得到消息
		 */
		private _chatPublicMsg(e: GameEvent) {
			// this._view.visible = false;

			this.chatView.visible = false;
			var chatModel: chat.ChatModel = e.data;

			var item = new BullChatInfoItem();
			this._chatInfoGroup.addChild(item);
			item.addEventListener("DESTROY_CHAT_ITEM", this._destroyChatItem, this);
			item.update(chatModel);
			this._chatArr.push(item);
			if (this._chatArr.length > 4) {
				var item1 = this._chatArr.shift();
				item1.removeEventListener("DESTROY_CHAT_ITEM", this._destroyChatItem, this);
				item1.destroy();
			}
			this._updatePos();
		}
		private _updatePos() {
			var h = 0;
			for (var i: number = 0; i < this._chatArr.length; i++) {
				this._chatArr[i].y = h;
				h += this._chatArr[i].height;
			}
		}
		private _destroyChatItem(e: GameEvent) {
			var item1: BullChatInfoItem = e.data;
			var ix = this._chatArr.indexOf(item1);
			if (ix >= 0) {
				var item = this._chatArr[ix];
				item.removeEventListener("DESTROY_CHAT_ITEM", this._destroyChatItem, this);
				item.destroy();
				this._chatArr.splice(ix, 1);
			}
			this._updatePos();
		}



		private _touchOtherPlayer(e: egret.TouchEvent) {
			PopupManager.instance.addPop(new BullOtherPlayerPopup());
		}

		public destroy(): void {
			this.removeEvent();
			if (this._updatePlayer) {
				this._updatePlayer.destroy();
			}
			this._updatePlayer = null;
			if (this._bullChipSys) {
				this._bullChipSys.destroy();
			}
			this._bullChipSys = null;
			if (this._bullDointSys) {
				this._bullDointSys.destroy();
			}
			this._bullDointSys = null;
			if (this._bullMenuSys) {
				this._bullMenuSys.destroy();
			}
			this._bullMenuSys = null;
			if (this._bullNoticeSys) {
				this._bullNoticeSys.destroy();
			}
			this._bullNoticeSys = null;
			if (this._bullResultSys) {
				this._bullResultSys.destroy();
			}
			this._bullResultSys = null;
			if (this._bullUpMasterSys) {
				this._bullUpMasterSys.destroy();
			}
			this._bullUpMasterSys = null;
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}