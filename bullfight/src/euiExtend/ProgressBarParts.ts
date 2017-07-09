module euiExtend {
	export class ProgressBarParts extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(egret.Event.COMPLETE, this._onComplete, this);
			this.skinName = "skins/common/ProgressBarPartsSkin.exml";
		}
		public bgImage: eui.Image;
		public barImage: eui.Image;
		public displayLabel: eui.Label;

		public barMask: egret.Rectangle;
		private _maxHeight: number = 30;
		private _isLabel: boolean;
		private _maxNumber: number;
		private _minNumber: number;
		private _value: number;
		private _w: number;
		private _h: number;

		private _percent: number;
		public get maxNumber(): number {
			return this._maxNumber;
		}
		public set maxNumber(value: number) {
			this._maxNumber = value;
		}
		public get minNumber(): number {
			return this._minNumber;
		}
		public set minNumber(value: number) {
			this._minNumber = value;
		}
		public get value(): number {
			return this._value;
		}
        /**
         * 设置进度条的值
         * 注:要设置了进度条的最大值才行
         */
		public set value(value: number) {
			this.setProgress(value, this.maxNumber);
		}

		public get w(): number {
			return this._w;
		}
        /***
         * 设置进度条宽度
         */
		public set w(value: number) {
			this._w = value;
			this.width = this._w;
		}
		public get h(): number {
			return this._h;
		}
        /**
         * 设置进度条高度
         */
		public set h(value: number) {
			if (value > this._maxHeight) {
				value = this._maxHeight;
			}
			this._h = value;
			this.height = this._h;
		}

		public _onComplete() {
			this.removeEventListener(egret.Event.COMPLETE, this._onComplete, this);
			this.build();
		}
		public build() {
			this.minNumber = 0;
			this._w = 200;
			this._h = 23;
			this._isLabel = true;

			this.addEvent();
		}
		public addEvent() {

		}
        /**
         * 隐藏 label
         */
		public hideLabel() {
			this.displayLabel.visible = false;
			this._isLabel = false;
		}
		public setBgImage(source: string | egret.Texture) {
			this.bgImage.source = source;
		}
        /**
         * 设置bar 背景
         */
		public getBgImage(): eui.Image {
			return this.bgImage;
		}
		public getBarImage(): eui.Image {
			return this.barImage;
		}
        /**
         * 设置bar
         */
		public setBarImage(source: string | egret.Texture) {
			this.barImage.source = source;
		}
        /**
         * 设置进度
         * isBoo:是否设置 显示 Label
         */
		public setProgress(val: number, totalNumber: number) {
			this._maxNumber = totalNumber;
			if (this._isLabel) {
				this.displayLabel.text = Math.floor(val) + "/" + Math.floor(this._maxNumber);
			}
			this._value = val;
			this.percent = val / this._maxNumber;
		}
        /**
         * 设置 Label
         */
		public setLabel(info: string) {
			this.displayLabel.text = info;//Math.floor(val) + "/" + Math.floor(totalNumber);
		}
        /**
         * set百分比
         */
		public set percent(num: number) {
			this._percent = num;
			var _val: number = num * this._w;//this.width;
			this.barMask = new egret.Rectangle(this.barImage.x - 1, this.barImage.y - 1, _val, this._h);
			this.barImage.mask = this.barMask;
		}
        /**
         * get百分比
         */
		public get percent(): number {
			return this._percent;
		}
        /**
         * 设置 bar 距离顶部的距离
         */
		public setBarTop(topNumber: number) {

		}

		public removeEvent() {

		}
		public destroy() {
			this.removeEvent();
			if (this.barImage) {
				this.removeChild(this.barImage);
			}
			this.barImage = null;
			this.barMask = null;
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}