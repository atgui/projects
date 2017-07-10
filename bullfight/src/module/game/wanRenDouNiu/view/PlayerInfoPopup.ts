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
		public sexImage: eui.Image;
		public idLabel: eui.Label;

		public closeButton: eui.Image;

		private _sourceStr: string;
		public build() {
			var headStr = "";
			var mod: player.PlayerModel = null;
			if (this._playerModel != null) {//查看其他玩家信息
				mod = this._playerModel;
				this.signatureEditableText.touchEnabled = false;
			} else {
				mod = player.PlayerControl.instance.mySelf;
				this._sourceStr = mod.signature;
				this.addEvent();
			}
			headStr = mod.portrait;
			this.nickNameLabel.text = mod.nickname;
			this.goldLabel.text = "分数:" + mod.goldcoins;
			this.signatureEditableText.text = mod.signature;
			this.idLabel.text = "ID:" + mod.id;
			this.sexImage.source = mod.sex == "0" ? "dnmain_profile_girl_png" : "dnmain_profile_boy_png";

			var __self = this;
			RES.getResByUrl(headStr, (data) => {
				__self.headerIcon.texture = data;
			}, this, RES.ResourceItem.TYPE_IMAGE);

			this.updateButton.visible = false;
			this.clearButton.visible = false;
			
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this);
		}
		public addEvent() {			
			this.signatureEditableText.addEventListener(egret.Event.FOCUS_IN, this._signatureFocusIn, this);
			this.signatureEditableText.addEventListener(egret.Event.FOCUS_OUT, this._signatureFocusOut, this);
			this.signatureEditableText.addEventListener(egret.Event.CHANGE, this._signatureChange, this);

			this.updateButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._updateSignTure, this);
			this.clearButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clearButton, this);
		}
		private _touchClose(e: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
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
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this);
			this.signatureEditableText.removeEventListener(egret.Event.FOCUS_IN, this._signatureFocusIn, this);
			this.signatureEditableText.removeEventListener(egret.Event.FOCUS_OUT, this._signatureFocusOut, this);
			this.signatureEditableText.removeEventListener(egret.Event.CHANGE, this._signatureChange, this);

			this.updateButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._updateSignTure, this);
			this.clearButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clearButton, this);
		}
		public destroy() {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}