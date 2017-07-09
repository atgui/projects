module game {
	export class CardEffMovieClip extends egret.MovieClip implements IView {
		public constructor(movieClipData: egret.MovieClipData,loopNum:number=1) {
			super(movieClipData);
			this._loopNum=loopNum;
			this.build();
		}
		private _loopNum:number;
		public build(): void {
			this.addEvent();
			this.gotoAndStop(1);
			this.play(this._loopNum);
		}
		public addEvent(): void {
			this.addEventListener(egret.Event.COMPLETE, this._complete, this);
		}
		public removeEvent(): void {
			this.removeEventListener(egret.Event.COMPLETE, this._complete, this);
		}
		private _complete(e: egret.Event): void {
			this.destroy();
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}