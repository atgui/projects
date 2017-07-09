module common {
	export class CommonHead extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
		}
		private _onComplete(): void {
			this.build();
		}
		private head_bg: eui.Image;
		private headIco: eui.Image;
		public headTexture: egret.Texture;
		public build(): void {
			this.addEvent();
			this.dispatchEvent(new GameEvent(GameEvent.INIT_COMPLETE))
		}
		private loader: egret.ImageLoader;
		/**
		 * url 头像地址
		 */
		public setHeadPortrait(url: string) {
			if (url) {
				var imageLoader: egret.ImageLoader = new egret.ImageLoader();
				imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
				imageLoader.load(url);
				this.loader = imageLoader;
			} else {
				console.log("没有头像路径");
			}
		}
		public setHeadBG(val: string) {
			this.head_bg.source = RES.getRes(val);
		}
		public setheadicowh(x: number, y: number, w: number, h: number) {
			this.headIco.x = x;
			this.headIco.y = y;
			this.headIco.width = w;
			this.headIco.height = h;
		}
		public addEvent(): void {
			this.headIco.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHead, this);
		}
		private onLoadComplete(e: egret.Event) {
			var imageLoader = <egret.ImageLoader>e.target;
			var bitmapData: egret.BitmapData = imageLoader.data;
			var texture = new egret.Texture();
			texture.bitmapData = bitmapData;
			this.headIco.texture = texture;
		}
		private onTouchHead() {
			this.dispatchEvent(new GameEvent("headico"));
		}
		public removeEvent(): void {
			this.headIco.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHead, this);
			if (this.loader) {
				this.loader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			}
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}