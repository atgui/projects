module hall {
	export class HallItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/HallItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private userNameLabel: eui.Label;//用户名
		private userHead: common.CommonHead;//头像
		private itemcoverImg: eui.Image;//封面图片
		private idLabel: eui.Label;//id
		private imageLoader:egret.ImageLoader;
		public build(): void {
			this.addEvent();
		}
		public dataChanged() {
			var obj: anchor.AnchorRoomModel = this.data;
			this.userNameLabel.text = obj.name;
			this.idLabel.text = obj.id;
			var headStr = obj.headUrl;
			this.userHead.setHeadPortrait(headStr);
			var photoStr = obj.photoUrl;
			this.setCoverImg(photoStr);
		}
		public addEvent(): void {
			this.itemcoverImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onItemCover, this);
		}
		private setCoverImg(url: string) {
			if (url) {
				this.imageLoader = new egret.ImageLoader();
				this.imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
				this.imageLoader.load(url);
			} else {
				console.log("没有头像路径");
			}
		}
		private onLoadComplete(e: egret.Event) {
			var imageLoader = <egret.ImageLoader>e.target;
			var bitmapData: egret.BitmapData = imageLoader.data;
			var texture = new egret.Texture();
			texture.bitmapData = bitmapData;
			this.itemcoverImg.texture = texture;
		}
		private _onItemCover() {
			var anchorRomm: anchor.AnchorRoomModel = this.data;
			hall.HallControl.instance.sendJoinWanRenDouNiu(anchorRomm);
			window["videoControl"].isPublish = false;
		}
		public removeEvent(): void {
			this.itemcoverImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onItemCover, this);
			if(this.imageLoader){
				this.imageLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
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