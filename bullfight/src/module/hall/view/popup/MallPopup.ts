module hall {
	export class MallPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/MallPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private tab: eui.TabBar;
		private viewStack: eui.ViewStack;
		private chipmallGroup: eui.Group;//筹码商城
		private chipmallList: eui.List;//筹码商城列表
		private diamondsmallGroup: eui.Group;//钻石商品
		private diamondsmallList: eui.List;//钻石商品列表
		private closeBtn: euiExtend.ButtonExtend;//关闭
		public build(): void {
			hall.HallControl.instance.send_shoping();
			this.addEvent();
		}
		private _initData(e: GameEvent) {
			var mmod: common.MallModel = e.data;
			var arrcollection:eui.ArrayCollection = new eui.ArrayCollection();
			for(var i:number =0;i<mmod.dmmodArr.length;i++){
				arrcollection.addItem(mmod.dmmodArr[i]);
			}
			this.diamondsmallList.dataProvider = arrcollection;
			this.diamondsmallList.itemRenderer = hall.MallItem;

			var arrction:eui.ArrayCollection = new eui.ArrayCollection();
			for(var i:number =0;i<mmod.cmmodArr.length;i++){
				arrction.addItem(mmod.cmmodArr[i]);
			}
			this.chipmallList.dataProvider = arrction;
			this.chipmallList.itemRenderer = hall.MallChipItem;
		}
		public addEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.addEventListener(hall.HallCMD.SHOPING, this._initData, this);
			this.tab.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchTab, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
		}
		private _tabImages: Array<string> = ["anniu_zhuanshishangchen", "anniu_choumashanchen"];
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
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.removeEventListener(hall.HallCMD.SHOPING, this._initData, this);
			this.tab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchTab, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}