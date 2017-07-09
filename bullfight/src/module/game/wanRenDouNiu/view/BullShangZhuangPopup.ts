module wanRenDouNiu {
	export class BullShangZhuangPopup extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/view/BullShangZhuangPopupSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}

		public closeButton: eui.Image;
		public upMasterButton: eui.Image;
		public infoLbael: eui.Label;

		public masterList: eui.List;
		private _masterArr: eui.ArrayCollection;

		public build(): void {
			var bullModel = BullControl.instance.BullModel;
			var list = bullModel.mstersList;
			var minMoney = bullModel.minNeedScore;
			var infoStr = `<b>上庄至少需要</b><font color='0xF2582E' size=20><b>${minMoney}</b></font><b>金币</b>`;
			this.infoLbael.textFlow = new egret.HtmlTextParser().parser(infoStr);

			this._masterArr = new eui.ArrayCollection();
			for (var i: number = 0; i < list.length; i++) {
				this._masterArr.addItem(list[i]);
			}
			this.masterList.itemRenderer = BullShangZhuangItem;
			this.masterList.dataProvider = this._masterArr;

			this.addEvent();
		}

		public addEvent(): void {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this);
			this.upMasterButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchUpMaster, this);
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchClose, this);
			this.upMasterButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchUpMaster, this);
		}

		private _touchClose(e: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		private _touchUpMaster(e: egret.TouchEvent) {
			BullControl.instance.send_bull_up_master();
			PopupManager.instance.removePop(this);
		}

		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}