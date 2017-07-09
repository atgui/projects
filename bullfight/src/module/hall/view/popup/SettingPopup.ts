module hall {
	export class SettingPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/SettingPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private closeBtn: euiExtend.ButtonExtend;//关闭
		private musicBtn: eui.Image;//音乐开关
		private soundBtn: eui.Image;//音效开关
		public build(): void {
			this.initData();
			this.addEvent();
		}
		private isOpenMusic: boolean = true;
		private isOpenSound: boolean = true;
		private initData() {
			// var iom = egret.localStorage.getItem("iom");
			// var ios = egret.localStorage.getItem("ios");
			if (SoundManager.instance.isOpenMusic == true) {
				this.isOpenMusic = true;
			} else {
				this.isOpenMusic = false;
			}
			this.closeOrOpen(this.isOpenMusic, this.musicBtn);
			if (SoundManager.instance.isOpenSound == true) {
				this.isOpenSound = true;
			} else {
				this.isOpenSound = false;
			}
			this.closeOrOpen(this.isOpenSound, this.soundBtn);
		}
		public addEvent(): void {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onMusic, this);
			this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSound, this);
		}

		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}

		private _onMusic(evt: egret.TouchEvent) {
			this.isOpenMusic = !this.isOpenMusic;
			// egret.localStorage.setItem("iom", (this.isOpenMusic).toString());
			SoundManager.instance.isOpenMusic = this.isOpenMusic;
			if (this.isOpenMusic == false) {
				SoundManager.instance.stopMusic();
			} else {
				SoundManager.instance.keepOnMusic();
			}
			this.closeOrOpen(this.isOpenMusic, this.musicBtn);
		}
		private _onSound(evt: egret.TouchEvent) {
			this.isOpenSound = !this.isOpenSound;
			// egret.localStorage.setItem("ios", (this.isOpenSound).toString());
			SoundManager.instance.isOpenSound = this.isOpenSound;
			if (this.isOpenSound == false) {
				SoundManager.instance.stopSoundEffect();
			} else {
				SoundManager.instance.keepOnSound();
			}
			this.closeOrOpen(this.isOpenSound, this.soundBtn);
		}
		private closeOrOpen(val: boolean, img: eui.Image) {
			if (val == true) {
				img.source = RES.getRes("on_button_png");
			} else {
				img.source = RES.getRes("off_button_png");
			}
			SoundManager.instance.buttonSound(2);
		}
		public removeEvent(): void {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onMusic, this);
			this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onSound, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}