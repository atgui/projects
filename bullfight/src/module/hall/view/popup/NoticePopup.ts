module hall {
	export class NoticePopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/NoticePopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private closeBtn: euiExtend.ButtonExtend;//关闭
		// private noticeScroller: eui.Scroller;//公告列表滚动组
		// private noticeList: eui.List;//公告列表
		private detailsGroup: eui.Group;//公告详细信息组
		private detailsLabel: eui.Label;//公告内容
		private okBtn: euiExtend.ButtonExtend;//确定按钮

		public build(): void {
			hall.HallControl.instance.send_announcement();
			this.detailsLabel.textFlow = (new egret.HtmlTextParser).parser(
				"游戏公告\n" +
				"在游戏内而已交易筹码的行为属于非法，请为了广大玩家和自身的利益，请自觉抵制，共同维护游戏秩序。\n" +
				"  1.对于使用不正当手段进行恶意刷筹码的玩家，一经查实，永久封号，并清除所有非法利益。\n" +
				"  2.对被封号的玩家，在有异议的情况下可以及时向客服提出申诉，官方将根据实际情况对封号做进一步处理。\n" +
				"  3.根据国家法律法规规定，游戏内严禁使用各种非法宣传途径和恶意游戏币交易行为。\n" +
				"  4.世界聊天频道、本地聊天频道、全局喇叭、玩家个性签名等，包括等不仅限于以上公共信息区域，如果存在宣传或恶意游戏币交易行为，一经查实永久封号。" +
				"良好公平游戏环境，需要你我共同维护！"
			);
			this.addEvent();
		}
		private _initData(e: GameEvent) {
			var arr = e.data;
		}
		public addEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.addEventListener(hall.HallCMD.ANNOUNCEMENT, this._initData, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		public removeEvent(): void {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.removeEventListener(hall.HallCMD.ANNOUNCEMENT, this._initData, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}