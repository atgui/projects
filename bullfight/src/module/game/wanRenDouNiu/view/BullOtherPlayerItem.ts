module wanRenDouNiu {
	export class BullOtherPlayerItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/view/BullOtherPlayerItemSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}

		public usernameLabel: eui.Label;
		public icon: eui.Image;
		public goldLabel: eui.Label;
		public signatureLabel: eui.Label;

		private _playerMod: player.PlayerModel;

		public build(): void {
			this.addEvent();
		}

		public addEvent(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchThis, this);
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
		}
		private _touchThis(e: egret.TouchEvent) {
			PopupManager.instance.addPop(new PlayerInfoPopup(this._playerMod));
		}

		//更新
		public update(mod: player.PlayerModel, index: number) {
			this._playerMod = mod;

			this.usernameLabel.text = mod.nickname;
			this.goldLabel.text = mod.goldcoins;
			this.signatureLabel.text = mod.signature;

			var col: number = index % 2;
			var row: number = Math.floor(index / 2);
			this.x = col * (this.width + 10);
			this.y = row * (this.height + 15);

			var __self = this;
			RES.getResByUrl(mod.portrait, (data) => {
				__self.icon.texture = data;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}