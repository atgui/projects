module euiExtend {
	export class ButtonExtend extends eui.Button {
		public constructor() {
			super();
			this.build();
		}
		public build() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchSelf, this);
		}
		private _onTouchSelf(evt: egret.TouchEvent) {
			SoundManager.instance.buttonSound(2);
		}
		public openBtnSound() {
			this.build();
		}
		public closeBtnSound() {
			SoundManager.instance.stopSoundEffect();
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchSelf, this);
		}
	}
}