module hall {
	export class MailItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/MailItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private titleLabel:eui.Label;//标题
		// private dayNumLabel:eui.Label;//天数
		private giftIco:eui.Image;//礼盒图标
		private unreadico:eui.Image;//消息图标

		public build(): void {
			this.addEvent();
		}
		public dataChanged(){
			var mmod:common.MailModel = this.data;
			this.titleLabel.text = mmod.title;
		}
		public addEvent(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this._onTouchSelf,this);
		}
		private _onTouchSelf(evt:egret.TouchEvent){
			var mmod:common.MailModel = this.data;
			PopupManager.instance.addPop(new hall.MailContenPopup(mmod));
		}
		public removeEvent(): void {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this._onTouchSelf,this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}