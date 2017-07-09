module hall {
	export class TurntablePopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/TurntablePopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}

		public bg_0: eui.Image;
		public bg_1: eui.Image;
		public startBt: eui.Button;
		public build(): void {
			this.bg_0.x += this.bg_0.anchorOffsetX = this.bg_0.width / 2;
			this.bg_0.y += this.bg_0.anchorOffsetY = this.bg_0.height / 2;

			this.bg_1.x += this.bg_1.anchorOffsetX = this.bg_1.width / 2;
			this.bg_1.y += this.bg_1.anchorOffsetY = this.bg_1.height / 2;
			this.addEvent();
		}

		public addEvent(): void {
			this.startBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchStart, this)
		}
		public removeEvent(): void {
			this.startBt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchStart, this)
		}

		private _touchStart(e: egret.TouchEvent) {
			this._startRun();
		}
		/**
		 * 开始旋转
		 */
		private _startRun() {
			var endRot: number = 30 + 360 * 8;
			EffectUtils.turntableRunStart(this.bg_0, this.bg_1,this._runComplete, this, endRot);
		}
		/**
		 * 旋转完成
		 */
		private _runComplete() {

		}


		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}