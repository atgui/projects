module popup {
	export class Prompt2Popup extends popup.PopupBase implements IView {

		public constructor(infoStr: string, comeBack: Function, thisObj: any) {
			super();
			this._infoStr = infoStr;
			this._comeBack = comeBack;
			this._thisObj = thisObj;
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/common/PromptPopupSkin.exml";
		}
		private _onComplete(e: eui.UIEvent) {
			this.build();
		}
		private _infoStr: string;
		private _comeBack: Function;
		private _thisObj: any;

		public infoLabel: eui.Label;
		public enterBt: eui.Button;
		public build() {
			this.infoLabel.text = this._infoStr;
			PopupManager.instance.addPop(this, popup.PopupType.OPEN_HIDE_ALL, true, true, popup.PopupInEffType.SCALE_L_S_L_N, false)
			this.addEvent();
		}
		public addEvent() {
			this.enterBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this);
		}
		private _touchClose(e: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
			if (this._comeBack) {
				this._comeBack.apply(this._thisObj);
			}
		}
		public removeEvent() {
			this.enterBt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this);
		}
		public destroy() {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}