module game {
	export class ResultZiEff extends egret.Sprite implements IView {
		private _id: number;
		public constructor(id: number) {
			super();
			this._id = id;
			this.build();
		}

		private _imgText: eui.BitmapLabel;
		public build(): void {
			// this._imgText = new eui.BitmapLabel();
			// this._imgText.font = RES.getRes("robfont_fnt");
			// this._imgText.width = 120;
			// this._imgText.height = 42;
			// this.addChild(this._imgText);
			// this._imgText.anchorOffsetX = this._imgText.width / 2;
			// this._imgText.anchorOffsetY = this._imgText.height / 2;
			// this._imgText.textAlign = "center";
			// this._imgText.text = common.CardStyle.getStrById(this._id);
			// this._imgText.y = 50;
			// EffectUtils.showCardResultZi(this._imgText, this._moveEnd, this);
			this.addEvent();
		}
		public addEvent(): void {
		}
		public removeEvent(): void {
		}
		private _moveEnd(): void {

		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}