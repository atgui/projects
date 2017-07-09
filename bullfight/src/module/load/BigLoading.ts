module load {
	export class BigLoading extends popup.PopupBase implements IUILoad, IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/loading/LoadingViewSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}

		private _resLoad: load.RESLoad;
		private loadingImg: eui.Image;
		private loadingNumLabel: eui.Label;

		private _maskSp: egret.Sprite;

		public build() {
			this.loadingNumLabel.text = "0";
			this._resLoad = new load.RESLoad();

			this._resLoad.load([
				"login",
				"bullfight", "loading", "font",
				"common",
				"sound"], null, null, this, null);

			this._maskSp = new egret.Sprite();
			this.addChild(this._maskSp);
			this.loadingImg.mask = this._maskSp;
			this.loadingNumLabel.textAlign = "center";
		}
		public addEvent() {

		}
		public removeEvent() {

		}
		public setCmd(cmd): void {
		}
		public currentProgress(progressNum: number, totalNum: number): void {
		}
		public totalProgress(progressNum: number, totalNum: number): void {
			var num: number = Math.floor(100 * progressNum / totalNum);
			this.loadingNumLabel.text = "" + num;

			var angleEnd: number = num * Math.PI / 50 - Math.PI / 2;

			this._maskSp.graphics.clear();
			this._maskSp.graphics.beginFill(0x00ffff, 1);
			this._maskSp.graphics.moveTo(366, 600);
			this._maskSp.graphics.lineTo(366, 418);
			this._maskSp.graphics.drawArc(366, 600, 182, -Math.PI / 2, angleEnd);
			this._maskSp.graphics.lineTo(366, 600);
			this._maskSp.graphics.endFill();
		}
		public currentComplete(obj: any): void {
			SoundManager.instance.bg_music();
			ConfigManager.instance.start();
			// SceneManager.instance.show("wanRenDouNiu");
			SceneManager.instance.show("login");
			this.destroy();
		}
		public destroy() {
			this._resLoad = null;
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}