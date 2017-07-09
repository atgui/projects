module hall {
	export class HallView extends eui.Component implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/HallViewSkin.exml";
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		private _onComplete(): void {
			this.build();
		}
		private topGroup: eui.Group;//顶部
		private comhead: common.CommonHead;//头像
		private sexIco: eui.Image;//性别图标
		private userNameLabel: eui.Label;//名称
		private goldLabel: eui.Label;//金币
		private jackpotLabel: eui.Label;//奖池
		public soundBtn: eui.Image;//声音按钮图片
		public hallMenuBtn: eui.Image;//展开或关闭按钮图片
		private buyGoldImg: eui.Image;//加号购买金币

		public middleGroup: eui.Group;//中部
		public storeBtn: euiExtend.ButtonExtend;//商店
		public activityBtn: euiExtend.ButtonExtend;//活动
		public drawIco: eui.Image;//转盘
		public hallMenuGroup: eui.Group;//展开菜单组
		public friendsGroup: eui.Group;//好友列表组
		public swiBtn: eui.Image;//显示或隐藏好友列表的按钮
		public friendsList: eui.List;//好友列表
		public noticeBtn: euiExtend.ButtonExtend;//公告
		public mailBtn: euiExtend.ButtonExtend;//邮件
		public settingBtn: euiExtend.ButtonExtend;//设置

		private bottomGroup: eui.Button;//底部
		public userInfoBtn: euiExtend.ButtonExtend;//用户信息
		public vipBtn: euiExtend.ButtonExtend;//vip信息
		public clubBtn: euiExtend.ButtonExtend;//俱乐部
		public regalListBtn: euiExtend.ButtonExtend;//财富榜

		public publishBt: euiExtend.ButtonExtend;//推送直播

		public liveList: eui.List;//直播列表
		public liveScroller: eui.Scroller;

		private hvts: hall.HallViewTweenSys;
		private _hornParts: common.HornPartsView;

		// private testGroup: eui.Group;

		public build(): void {
			this.initData();
			this.addEvent();
			HallControl.instance.send_anchorlist();
			SoundManager.instance.bgReplay();
		}
		private initData() {
			this.hvts = new hall.HallViewTweenSys(this);
			this._updataMySelf(null);


			var arrcollec: eui.ArrayCollection = new eui.ArrayCollection();
			for (var i: number = 0; i < 15; i++) {
				arrcollec.addItem(i);
			}
			this.friendsList.itemRenderer = hall.FriendsItem;
			this.friendsList.dataProvider = arrcollec;

			var rdHeight: number = AdaptiveManager.instance.reducedHeight;
			this.liveScroller.height = this.liveScroller.height - rdHeight;
			this.liveList.itemRenderer = hall.HallItem;
			this._hornParts = new common.HornPartsView();
			this._hornParts.y = 100;
			AdaptiveManager.instance.relativeByBottom(this.bottomGroup);
		}
		// private _img: eui.Image;
		// private twfpAnim(val: any) {
		// 	if (!this._img) {
		// 		this._img = new eui.Image();
		// 		this._img.horizontalCenter = 0;
		// 		this.testGroup.addChild(this._img);
		// 	}
		// 	this._img.anchorOffsetX = this._img.width / 2;
		// 	// this._img.anchorOffsetY = this._img.height / 2;
		// 	if (val == 1) {
		// 		this._img.source = RES.getRes("cardmin_1_1_png");
		// 		this.pokerTween(this._img, 0, this.twfpAnim, this);
		// 	} else {
		// 		this._img.source = RES.getRes("card_back_1_png");
		// 		this.pokerTween(this._img, 90, this.twfpAnim, this);
		// 	}
			
		// }

		// private _pokertween: TimelineLite;
		// /**
		//  * 开牌动画
		//  */
		// public pokerTween(obj: any, teval: number, comeBack: Function, target: any) {
		// 	this._pokertween = new TimelineLite({ onComplete: comeBack, onCompleteScope: target, onCompleteParams: [1] });
		// 	this._pokertween.append(new TweenLite(obj, 0.5, { skewY: teval }));
		// 	this._pokertween.play();
		// }

		public addEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.addEventListener(hall.HallCMD.HALL_INTOGAME, this._intoGame, this);
			mod.addEventListener(hall.HallCMD.LIVE_LIST, this._liveList, this);
			var playermod: player.PlayerModel = player.PlayerControl.instance.mySelf;
			playermod.addEventListener(GameEvent.CHANGE, this._updataMySelf, this);
			this.regalListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onRegalList, this);
			this.userInfoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onUserInfoBtn, this);
			this.clubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClub, this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSetting, this);
			this.noticeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onNotice, this);
			this.mailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onMail, this);
			this.drawIco.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchDarw, this);
			this.vipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onVip, this);
			this.storeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onStore, this);
			this.buyGoldImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onBuyGold, this);
			this.comhead.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onUserInfoBtn, this);
			this.publishBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onPublishBtn, this);
			// this.testGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onTestGroup, this);
		}
		// private _onTestGroup() {
		// 	this.twfpAnim(0);
		// }
		private _onBuyGold(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.MallPopup());
		}

		private _intoGame(e: GameEvent) {
			var gameName: string = hall.HallControl.instance.hallModel.joinGameName;
			switch (gameName) {
				case "wanRenDouNiu":
					SceneManager.instance.show("wanRenDouNiu");
					break;
			}
		}
		private _liveList(e: GameEvent) {
			var anchorList: Array<anchor.AnchorRoomModel> = e.data;
			var livecollec: eui.ArrayCollection = new eui.ArrayCollection();
			for (var i: number = 0; i < anchorList.length; i++) {
				livecollec.addItem(anchorList[i]);
			}
			this.liveList.dataProvider = livecollec;
		}
		private _updataMySelf(e: GameEvent) {
			var playermod: player.PlayerModel = player.PlayerControl.instance.mySelf;
			this.userNameLabel.text = playermod.username;
			this.goldLabel.text = playermod.goldcoins;
			this.comhead.setHeadPortrait(playermod.portrait);
		}
		private _onRegalList(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.FortuneListPopup());
		}
		private _onUserInfoBtn(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.UserInfoPopup());
		}
		private _onClub(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.ClubPopup());
		}
		private _onSetting(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.SettingPopup());
		}
		private _onNotice(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.NoticePopup());
		}
		private _onMail(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.MailPopup());
		}
		private _onTouchDarw(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.LuckDrawPopup());
		}
		private _onVip(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.VIPPopup());
		}
		private _onStore(evt: egret.TouchEvent) {
			PopupManager.instance.addPop(new hall.MallPopup());
		}
		private _onPublishBtn(evt: egret.TouchEvent) {
			//	hall.HallControl.instance.sendJoinWanRenDouNiu(null);
			//	window["videoControl"].isPublish = true;
		}
		public removeEvent(): void {
			var mod: hall.HallModel = hall.HallControl.instance.hallModel;
			mod.removeEventListener(hall.HallCMD.HALL_INTOGAME, this._intoGame, this);
			mod.removeEventListener(hall.HallCMD.LIVE_LIST, this._liveList, this);
			var playermod: player.PlayerModel = player.PlayerControl.instance.mySelf;
			playermod.removeEventListener(GameEvent.CHANGE, this._updataMySelf, this);
			this.buyGoldImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onBuyGold, this);
			this.regalListBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onRegalList, this);
			this.userInfoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onUserInfoBtn, this);
			this.clubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClub, this);
			this.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onSetting, this);
			this.noticeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onNotice, this);
			this.mailBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onMail, this);
			this.drawIco.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onTouchDarw, this);
			this.vipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onVip, this);
			this.storeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onStore, this);
			this.comhead.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onUserInfoBtn, this);
			this.publishBt.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onPublishBtn, this);
		}
		public destroy(): void {
			this.removeEvent();
			this.comhead.destroy();
			this.hvts.destroy();
			this._hornParts.destroy();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}