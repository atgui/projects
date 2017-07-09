module wanRenDouNiu {
	export class SettlementPopup extends popup.PopupBase {
		public constructor(bsrval: common.BullServer_Result) {
			super();
			this.bsrMod = bsrval;
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/view/SettlementPopupSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}
		private winGroup: eui.Group;//赢
		private loseGroup: eui.Group;//输
		// private closeBtn: euiExtend.ButtonExtend;//关闭按钮
		// private titleLabel: eui.Label;//标题
		private arewardBtn: euiExtend.ButtonExtend;//打赏
		private totalCountLabel: eui.Label;//个人得分
		private bankerCountLabel: eui.Label;//庄家得分
		private settlementList: eui.List;//结算列表

		private bsrMod: common.BullServer_Result;

		public winBg: eui.Image;

		public build(): void {
			this.initData();
			this.addEvent();
		}
		private initData() {
			var winso: number = this.bsrMod.myWinScore;
			if (winso >= 0) {//赢
				SoundManager.instance.winvictory();
			} else {//输
				SoundManager.instance.fail();
				this.winBg.source = "wr_result_lose_png";
			}
			this.totalCountLabel.text = winso.toString();
			var playerMod: player.PlayerModel = player.PlayerControl.instance.mySelf;//获得自己的信息
			// this.titleLabel.text = playerMod.username;
			var arrcollection: eui.ArrayCollection = new eui.ArrayCollection();
			for (var i: number = 0; i < this.bsrMod.allWinInfo.length; i++) {
				arrcollection.addItem({ index: 2, data: this.bsrMod.allWinInfo[i] });
			}
			this.settlementList.itemRenderer = wanRenDouNiu.BankerListItem;
			this.settlementList.dataProvider = arrcollection;
			this.bankerCountLabel.text = this.bsrMod.masterWin.toString();
		}

		public addEvent(): void {
			// this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			var mod: BullModel = BullControl.instance.BullModel;
			mod.addEventListener(BullCMD.BULL_DOING, this._startfp, this);
			// this.arewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onAreward, this);
		}
		private _startfp(ev: GameEvent) {
			PopupManager.instance.removePop(this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		private _onAreward(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
			wanRenDouNiu.BullControl.instance.setEventInfo("showgift");
		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			// this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			var mod: BullModel = BullControl.instance.BullModel;
			mod.removeEventListener(BullCMD.BULL_DOING, this._startfp, this);
			// this.arewardBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onAreward, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}