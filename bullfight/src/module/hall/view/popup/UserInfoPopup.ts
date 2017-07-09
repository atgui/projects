module hall {
	export class UserInfoPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/UserInfoPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private closeBtn: euiExtend.ButtonExtend;//关闭
		private nickNameLabel: eui.Label;//昵称
		private titleLabel: eui.Label;//称号
		private replaceHeadBtn: euiExtend.ButtonExtend;//更换头像
		private userHead: common.CommonHead;//头像图片
		private sexIco: eui.Image;//性别图标
		private RankingIco: eui.Image;//当前所处排名图标
		private upgradeBtn: euiExtend.ButtonExtend;//升级按钮
		private shareBtn: euiExtend.ButtonExtend;//分享
		private goldLabel: eui.Label;//筹码
		private lockIco1: eui.Image;//筹码锁
		private diamondsLabel: eui.Label;//钻石
		private lockIco2: eui.Label;//钻石锁
		private prestigeLabel: eui.Label;//声望值
		private charmLabel: eui.Label;//魅力值
		private giveBtn: euiExtend.ButtonExtend;//赠送筹码
		private autographEText: eui.EditableText;//个性签名
		private editBtn: euiExtend.ButtonExtend;//编辑按钮
		private severBtn: euiExtend.ButtonExtend;//保存按钮
		public build(): void {
			this.initData();
			this.addEvent();
		}
		private initData() {
			var self: player.PlayerModel = player.PlayerControl.instance.mySelf;
			this.nickNameLabel.text = self.nickname;
			this.titleLabel.text = self.username;
			this.goldLabel.text = self.goldcoins;
			this.diamondsLabel.text = self.diamond;
			this.userHead.setHeadPortrait(self.portrait);
			this.prestigeLabel.text = self.experience.toString();
			this.charmLabel.text = self.charm;
			this.autographEText.text = self.signature;
			this.autographEText.touchEnabled = false;
			if (self.vip > -1 && self.vip < 11) {
				this.RankingIco.source = RES.getRes("vip_min_icon_" + self.vip + "_png");
			}
		}
		public addEvent(): void {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.replaceHeadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReplaceHead, this);
			this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onUpGrade, this);
			this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onShare, this);
			this.giveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onGive, this);
			this.editBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchEdit, this);
			this.severBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchSever, this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		private _onReplaceHead(evt: egret.TouchEvent) {
			// PopupManager.instance.addPop(new wanRenDouNiu.ReplacePhotoPopup());
		}
		private _onUpGrade(evt: egret.TouchEvent) {

		}
		private _onShare(evt: egret.TouchEvent) {

		}
		private _onGive(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.GivePopup());
		}
		/**
		 * 编辑按钮
		 */
		private _onTouchEdit(evt: egret.TouchEvent) {
			this.autographEText.touchEnabled = true;
			this.severBtn.visible = true;
			this.editBtn.visible = false;
		}
		/**
		 * 保存按钮
		 */
		private _onTouchSever(evt: egret.TouchEvent) {
			this.editBtn.visible = true;
			this.severBtn.visible = false;
			var str: string = this.autographEText.text;
			var obj = { "signature": str };
			common.CommonControl.instance.sendModify(obj);
		}
		public removeEvent(): void {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.replaceHeadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReplaceHead, this);
			this.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onUpGrade, this);
			this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onShare, this);
			this.giveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onGive, this);
			this.editBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchEdit, this);
			this.severBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchSever, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}