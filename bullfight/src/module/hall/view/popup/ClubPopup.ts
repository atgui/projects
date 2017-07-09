module hall {
	export class ClubPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/ClubPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private tab: eui.TabBar;
		private viewStack: eui.ViewStack;
		private closeBtn: euiExtend.ButtonExtend;//关闭
		private applyBtn: euiExtend.ButtonExtend;//申请加入
		public build(): void {
			this.initData();
			this.addEvent();
		}
		private initData() {

		}
		public addEvent(): void {
			this.tab.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchTab, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this._onClose,this);
		}
		private _tabImages: Array<string> = ["anniu_wodejulebu", "anniu_julebu"];
		private _onTouchTab(evt: egret.TouchEvent) {
			var tabBar: eui.TabBar = evt.currentTarget;
			var index: number = evt.currentTarget.selectedIndex;
			var len: number = tabBar.numChildren;
			for (var i: number = 0; i < len; i++) {
				var itemReader: eui.ItemRenderer = <eui.ItemRenderer>tabBar.getChildAt(i);
				var img: eui.Image = <eui.Image>itemReader.getChildAt(0);
				if (index == i) {
					img.source = RES.getRes(this._tabImages[i] + "_0_png");
				} else {
					img.source = RES.getRes(this._tabImages[i] + "_1_png");
				}
			}
		}
		private _onClose(evt:egret.TouchEvent){
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			this.tab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchTab, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this._onClose,this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}