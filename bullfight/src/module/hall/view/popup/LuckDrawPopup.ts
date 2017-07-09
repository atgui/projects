module hall {
	export class LuckDrawPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/LuckDrawPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private drawbg: eui.Image;//转盘背景
		private zpImg: eui.Image;//转盘旋转
		private startBtn: euiExtend.ButtonExtend;//开始
		private closeBtn: euiExtend.ButtonExtend;//关闭按钮
		private frequency: eui.Label;//剩余次数
		private timeLabel: eui.Label;//时间
		public build(): void {
			this.initData();
			this.addEvent();
		}
		private initData() {

		}

		public addEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.addEventListener(hall.HallCMD.ROTARY_PRIZE, this.calculateZP, this);
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onStart, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
		}
		private _onStart(evt: egret.TouchEvent) {
			hall.HallControl.instance.send_rotary_prize();
		}
		private _tw: TimelineLite;
		/**
		 * 计算转盘所需值与旋转
		 * id结果id
		 */
		private calculateZP(e: GameEvent) {
			var id = e.data;
			var degress: number = id * 45 - 8 + Math.floor(Math.random() * 22);
			var endrot: number = degress + 360 * 8;
			this.startBtn.enabled = false;
			this._nowRotNum = this.zpImg.rotation;
			this._tw = EffectUtils.turntableAnim(this.zpImg, endrot, this._taover, this._onRotate, this);
		}
		private _nowRotNum: number;
		private _onRotate(data) {
			this.zpImg.rotation = data.rotation;
			if (data.rotation - this._nowRotNum >= 60) {
				this._nowRotNum = data.rotation;
				SoundManager.instance.playSoundEffect("luckDrawRun_mp3");
			};
		}
		private _taover() {
			this.startBtn.enabled = true;
			console.log("旋转结束");
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.removeEventListener(hall.HallCMD.ROTARY_PRIZE, this.calculateZP, this);
			this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onStart, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
		}
		public destroy(): void {
			if (this._tw) {
				this._tw.clear();
			}
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}