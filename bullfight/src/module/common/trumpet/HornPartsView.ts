module common {
	export class HornPartsView extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/common/HornPartsSkin.exml";
		}

		private _onComplete(e: eui.UIEvent) {
			this.build();
		}
		public infoLabel: eui.Label;
		private _showTimes: number;
		public build() {
			this.visible = false;
			this.infoLabel.multiline = false;
			var spMask: egret.Sprite = new egret.Sprite();
			spMask.graphics.beginFill(0x007700, 1);
			spMask.graphics.drawRect(this.infoLabel.x, this.infoLabel.y, this.infoLabel.width, this.infoLabel.height);
			this.addChild(spMask);
			this.infoLabel.mask = spMask;
			this.x = (LayerManager.instance.stageWidth - this.width) / 2;
			LayerManager.instance.frameLayer.addChild(this);
			this._showTimes = 0;
			this.touchEnabled = false;
			this.addEvent();
		}
		public addEvent() {
			CommonControl.instance.addEventListener("trumpet", this._show, this);
		}

		public removeEvent() {
			CommonControl.instance.removeEventListener("trumpet", this._show, this);
			TimeManager.instance.removeFun(this._timeRun, this);
		}
		private _show(e: GameEvent) {
			var str: string = e.data;
			this._initLabel(str);
		}
		private _initLabel(str: string) {
			var labels: eui.Label = new eui.Label();
			labels.multiline = false;
			labels.textFlow = new egret.HtmlTextParser().parser(str);
			this.visible = true;
			this.infoLabel.textFlow
			this.infoLabel.width = labels.textWidth;
			this.infoLabel.textFlow = new egret.HtmlTextParser().parser(str);
			this.infoLabel.x = 400 + 107;
			this._showTimes = 0;
			labels = null;
			TimeManager.instance.addFun(this._timeRun, this);
		}
		private _timeRun() {
			this.infoLabel.x -= 1;
			if (this.infoLabel.width + this.infoLabel.x - 107 < 0) {
				this.infoLabel.x = 400 + 107;
				this._showTimes += 1;
			}
			if (this._showTimes >= 3) {
				this._showTimes = 0;
				this.visible = false;
				TimeManager.instance.removeFun(this._timeRun, this);
			}
		}
		public destroy() {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}