module load {
	export class InitLoading implements IUILoad, IView {
		private _resLoad: load.RESLoad;
		public constructor() {
			this.build();
		}

		public build() {
			this._resLoad = new load.RESLoad();
			this._resLoad.load(["loading","font"], null, null, this, null)
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
		}
		public currentComplete(obj: any): void {
			FontManager.instance.start();
			SceneManager.instance.show("loading");
			this.destroy();
		}
		public destroy() {
			this._resLoad = null;
		}
	}
}