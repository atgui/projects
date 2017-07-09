module hall {
	export class VIPPopup extends popup.PopupBase {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/popup/VIPPopupSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		private vipGroup: eui.Group;
		private closeBtn: euiExtend.ButtonExtend;//关闭
		private sotreBuyBtn: euiExtend.ButtonExtend;//购买商品
		private receiveBtn: euiExtend.ButtonExtend;//领取
		private chipnumLabel: eui.Label;//筹码数
		private currentVipLevelIco: eui.Image;//当前vip等级图标
		private nextVipLevelIco: eui.Image;//下一个等级图标
		private timeGroup: eui.Group;//倒计时组
		private countDownLabel: eui.Label;//倒计时时间
		private cutvipico: eui.Image;//当前vip
		public build(): void {
			this.addEvent();
			this._timeChange(null);
			common.CommonControl.instance.sendVipList();
		}
		private initData(e: GameEvent) {
			var infoArr: Array<any> = e.data;
			for (var i: number = 0; i < infoArr.length; i++) {
				var valueNum: number = infoArr[i].goldcoins;
				this["vipText_" + i].text = valueNum.toString();
			}

			this.currentVipLevelIco.visible = false;
			this.cutvipico.visible = false;
			var nextVip: number = 0;
			var playerMod = player.PlayerControl.instance.mySelf;
			if (playerMod.vip > 0) {
				this.currentVipLevelIco.visible = true;
				this.cutvipico.visible = true;
				this.currentVipLevelIco.source = RES.getRes("V" + playerMod.vip + "-1_png");
				this.cutvipico.source = RES.getRes("V" + playerMod.vip + "-1_png");
				if (playerMod.vip > 10) {
					nextVip = playerMod.vip;
				} else {
					nextVip = playerMod.vip + 1;
				}
				this.nextVipLevelIco.source = RES.getRes("V" + nextVip + "-1_png");
			}
			var totalval: number = 0;
			for (var i: number = 1; i <= nextVip; i++) {
				var vipcon =infoArr[i-1].experience;
				totalval += 0+vipcon;
			}
			// var nextvipcon = ConfigManager.instance.getVIPGrowthByLevel(playerMod.vip + 1);
			if (vipcon) {
				this.setbar(playerMod.experience, totalval);
				this.chipnumLabel.text = vipcon.gainGold;
			}
		}
		/**
		 * 进度条
		 */
		private setbar(cutval: number, maxval: number) {
			var bar: euiExtend.ProgressBarParts = new euiExtend.ProgressBarParts();
			bar.width = 295;
			bar.height = 20;
			bar.minNumber = 0;
			bar.maxNumber = maxval;
			bar.setProgress(cutval, maxval);
			bar.x = 178;
			bar.y = 205;
			this.vipGroup.addChild(bar);
		}
		public addEvent(): void {
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.sotreBuyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onStoreBuy, this);
			this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onReceive, this);
			var sys: common.VipSys = common.CommonControl.instance.vipSys;
			sys.addEventListener(common.CommonCMD.VIP_LIST, this.initData, this);
			sys.addEventListener(GameEvent.CHANGING, this._timeChange, this);
		}
		private _onClose(evt: egret.TouchEvent) {
			PopupManager.instance.removePop(this);
		}
		/**
		 * 商城购买
		 */
		private _onStoreBuy(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.MallPopup());
			PopupManager.instance.removePop(this);
		}
		/**
		 * 领取
		 */
		private _onReceive(evt: egret.TouchEvent) {
			common.CommonControl.instance.sendReveiceVip();
		}
		/**
		 * 倒计时
		 */
		private _timeChange(e: GameEvent) {
			var sys: common.VipSys = common.CommonControl.instance.vipSys;
			var t: number = sys.countTime;
			this.countDownLabel.text = t.toString();
			if (t > 0) {
				this.timeGroup.visible = true;
				this.receiveBtn.visible = false;
			} else {
				this.timeGroup.visible = false;
				this.receiveBtn.visible = true;
			}
		}

		public removeEvent(): void {
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClose, this);
			this.sotreBuyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onStoreBuy, this);
			this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onReceive, this);
			var sys: common.VipSys = common.CommonControl.instance.vipSys;
			sys.removeEventListener(common.CommonCMD.VIP_LIST, this.initData, this);
			sys.removeEventListener(GameEvent.CHANGING, this._timeChange, this);
		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}