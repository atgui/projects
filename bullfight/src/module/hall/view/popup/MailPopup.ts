module hall {
	export class MailPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/MailPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private closeBtn: euiExtend.ButtonExtend;//关闭
		private oneKeyReceiveBtn: euiExtend.ButtonExtend;//一键领取
		private mailList: eui.List;//邮件列表
		public build(): void {
			this.addEvent();
			hall.HallControl.instance.send_email_list();
		}
		private _updataList(e: GameEvent) {
			var arrm: Array<common.MailModel> = e.data;
			var arrcoction: eui.ArrayCollection = new eui.ArrayCollection();
			for (var i: number = 0; i < arrm.length; i++) {
				arrcoction.addItem(arrm[i]);
			}
			this.mailList.dataProvider = arrcoction;
			this.mailList.itemRenderer = hall.MailItem;
		}
		public addEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.addEventListener(hall.HallCMD.EMAIL_LIST, this._updataList, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.removeEventListener(hall.HallCMD.EMAIL_LIST, this._updataList, this);
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