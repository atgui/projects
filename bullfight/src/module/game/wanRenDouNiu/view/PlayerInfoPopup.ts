module wanRenDouNiu {
	export class PlayerInfoPopup extends eui.Component implements IView {
		public constructor(pMod?: player.PlayerModel) {
			super()
			this._playerModel = pMod;
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/bullfight/view/PlayerInfoPopupSkin.exml";
		}

		private _onComplete(e: eui.UIEvent) {
			this.build();
		}

		private _playerModel: player.PlayerModel;

		public nickNameLabel: eui.Label;
		public signatureEditableText: eui.EditableText;
		public goldLabel: eui.Label;
		public updateButton: eui.Label;
		public clearButton: eui.Label;
		public headerIcon: eui.Image;

		private _sourceStr: string;

		private _sp: egret.Shape;

		public build() {
			var headStr = "";
			if (this._playerModel != null) {//查看其他玩家信息
				headStr = this._playerModel.portrait;
				this.nickNameLabel.text = this._playerModel.nickname;
				this.goldLabel.text = this._playerModel.goldcoins;
				this.signatureEditableText.text = this._playerModel.signature;

				this.signatureEditableText.touchEnabled=false;
			} else {
				var playerModel = player.PlayerControl.instance.mySelf;
				this.nickNameLabel.text = playerModel.nickname;
				this.goldLabel.text = playerModel.goldcoins;
				this.signatureEditableText.text = this._sourceStr = playerModel.signature;

				headStr = playerModel.portrait;
				this.addEvent();
			}

			this._sp = new egret.Shape();
			this._sp.graphics.beginFill(0x000000);
			this._sp.graphics.drawCircle(this.headerIcon.x + this.headerIcon.width / 2, this.headerIcon.y + this.headerIcon.height / 2, 48);
			this._sp.graphics.endFill();
			this.addChild(this._sp);
			this.headerIcon.mask = this._sp;

			var __self = this;
			RES.getResByUrl(headStr, (data) => {
				__self.headerIcon.texture = data;
			}, this, RES.ResourceItem.TYPE_IMAGE);

			this.updateButton.visible = false;
			this.clearButton.visible = false;
		}
		public addEvent() {
			this.signatureEditableText.addEventListener(egret.Event.FOCUS_IN, this._signatureFocusIn, this);
			this.signatureEditableText.addEventListener(egret.Event.FOCUS_OUT, this._signatureFocusOut, this);
			this.signatureEditableText.addEventListener(egret.Event.CHANGE, this._signatureChange, this);

			this.updateButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._updateSignTure, this);
			this.clearButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clearButton, this);
		}
		private _updateSignTure(e: egret.TouchEvent) {
			var str: string = this.signatureEditableText.text;
			var obj = { "signature": str };
			if (str == this._sourceStr) {
				this.updateButton.visible = false;
				this.clearButton.visible = false;
				return;
			}
			common.CommonControl.instance.sendModify(obj);
		}
		private _clearButton(e: egret.TouchEvent) {
			this.updateButton.visible = false;
			this.clearButton.visible = false;
			this.signatureEditableText.text = this._sourceStr;
		}

		private _signatureFocusIn(e: egret.Event) {
			this.updateButton.visible = true;
			this.clearButton.visible = true;
		}

		private _signatureFocusOut(e: egret.Event) {
			var str: string = this.signatureEditableText.text;
			var info = str.trim();
			if (info == this._sourceStr) {
				this.updateButton.visible = false;
				this.clearButton.visible = false;
			}
		}

		private _signatureChange(e: egret.Event) {

		}
		public removeEvent() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
		}
		public destroy() {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}