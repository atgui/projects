module hall {
	export class FortuneListPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/FortuneListPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private charmGroup: eui.Group;//魅力组
		private fortuneGroup: eui.Group;//富豪组
		private fortuneList: eui.List;//富豪榜
		private charmList: eui.List;//魅力集合
		private closeBtn: euiExtend.ButtonExtend;//关闭
		private tab: eui.TabBar;
		private viewStack: eui.ViewStack;
		public build(): void {
			hall.HallControl.instance.send_ranking();
			this.addEvent();
		}
		private _initData(e: GameEvent) {
			var coinArr = e.data.coinArr;
			var charmArr = e.data.charmArr;
			this._setFortuneList(coinArr);
			this._setCharmList(charmArr);

		}
		private _setFortuneList(data): void {
			var flmarr: Array<common.FortuneListModel> = data;
			var fortunelist = this.ranklist(flmarr,"goldcoins");
			var arrcollection: eui.ArrayCollection = new eui.ArrayCollection();
			for (var i: number = 0; i < fortunelist.length; i++) {
				arrcollection.addItem(fortunelist[i]);
			}
			this.fortuneList.itemRenderer = hall.FortuneListItem;
			this.fortuneList.dataProvider = arrcollection;
		}
		private _setCharmList(data): void {
			var clmarr: Array<common.CharmListModel> = data;
			var charlist = this.ranklist(clmarr,"charm");
			var arrcollection: eui.ArrayCollection = new eui.ArrayCollection();
			for (var i: number = 0; i < charlist.length; i++) {
				arrcollection.addItem(charlist[i]);
			}
			this.charmList.itemRenderer = hall.CharmListItem;
			this.charmList.dataProvider = arrcollection;
		}
		/**
		 * 根据指定属性排名 从大到小
		 * list  排名集合  str 更具什么属性排名 
		 */
		public ranklist(list: Array<any>, str: any): Array<any> {
			list.sort(function (a, b) { return b[str] - a[str] });
			return list;
		}
		public addEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.addEventListener(hall.HallCMD.RANKING, this._initData, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.tab.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchTab, this);
		}
		private _tabImages: Array<string> = ["anniu_caifupaihang", "anniu_meilipaihang"];
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
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.removeEventListener(hall.HallCMD.RANKING, this._initData, this);
			this.tab.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchTab, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}