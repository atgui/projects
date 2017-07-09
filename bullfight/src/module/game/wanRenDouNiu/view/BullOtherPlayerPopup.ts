module wanRenDouNiu {
	export class BullOtherPlayerPopup extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/view/BullOtherPlayerPopupSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}
		public closeButton: eui.Image;
		public playerInfoScroller: eui.Scroller;
		private _infoGroup: eui.Group;

		private userCountLabel: eui.Label;

		public build(): void {
			this._infoGroup = new eui.Group();
			this.playerInfoScroller.viewport = this._infoGroup;
			this.userCountLabel.text = "0";
			BullControl.instance.setRoomUserList();
			this.addEvent();
		}

		public addEvent(): void {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchCloseButton, this)

			var bModel = BullControl.instance.BullModel;
			bModel.addEventListener(BullCMD.ONLINE, this._bullOnLine, this);
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchCloseButton, this)

			var bModel = BullControl.instance.BullModel;
			bModel.removeEventListener(BullCMD.ONLINE, this._bullOnLine, this);
		}

		private _touchCloseButton(e: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}

		private _bullOnLine(e: GameEvent) {
			var list = e.data;
			var playerList = new Array<player.PlayerModel>();
			for (var j: number = 0; j < list.length; j++) {
				var modList = list[j][4];//一个人的信息
				var o = new player.PlayerModel();
				for (var i: number = 0; i < modList.length; i++) {
					o[modList[i][0]] = modList[i][2];
				}
				playerList.push(o);
			}
			// playerList = playerList.concat(playerList, playerList, playerList);
			for (var i: number = 0; i < playerList.length; i++) {
				var item = new BullOtherPlayerItem();
				item.update(playerList[i], i);
				this._infoGroup.addChild(item);
			}

			this.userCountLabel.text = playerList.length + "";
		}

		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}