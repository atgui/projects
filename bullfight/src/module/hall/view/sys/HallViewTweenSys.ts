module hall {
	export class HallViewTweenSys implements IView {
		private _view: hall.HallView;
		public constructor(view: hall.HallView) {
			this._view = view;
			this.build();
		}
		private isShowFriend: boolean = false;//是否显示好友列表
		private isShowMenu: boolean = false;//是否显示菜单
		public build(): void {
			this.initdata();
			this.addEvent();
		}
		private initdata() {
			var spMask = new egret.Shape();
			spMask.graphics.beginFill(0x000000);
			spMask.graphics.drawRect(this._view.hallMenuGroup.x, 0, this._view.hallMenuGroup.width, this._view.hallMenuGroup.height);
			spMask.graphics.endFill();
			this._view.middleGroup.addChild(spMask);
			this._view.hallMenuGroup.mask = spMask;
		}
		public addEvent(): void {
			this._view.swiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onSwiBtn, this)
			this._view.hallMenuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onHallMenu, this);
			// this._view.noticesImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onNoticesImgBeGin, this);
			// this._view.noticesImg.addEventListener(egret.TouchEvent.TOUCH_END, this._onNoticesImgEnd, this);
		}
		/**
		 * 显示或隐藏
		 */
		private _onSwiBtn(evt: egret.TouchEvent) {
			this.isShowFriend = !this.isShowFriend;
			this.setShowTween(this.isShowFriend, 1);
		}
		private setShowTween(isshow: boolean, val: number) {
			if (isshow) {//显示
				if (val == 1) {
					this._view.swiBtn.source = RES.getRes("hall_btn_left_close_png");
					TweenLite.to(this._view.friendsGroup, 0.3, { x: 0 });
				} else if (val == 2) {
					TweenLite.to(this._view.hallMenuGroup, 0.3, { y: -315 });
				}
			} else {
				if (val == 1) {
					this._view.swiBtn.source = RES.getRes("hall_btn_left_open_png");
					TweenLite.to(this._view.friendsGroup, 0.3, { x: -65 });
				} else if (val == 2) {
					TweenLite.to(this._view.hallMenuGroup, 0.3, { y: 0 });
				}
			}
		}
		private _onHallMenu(evt: egret.TouchEvent) {
			this.isShowMenu = !this.isShowMenu;
			if (this.isShowMenu) {
				TweenLite.to(this._view.hallMenuBtn, 0.3, { rotation: 0 });
			} else {
				TweenLite.to(this._view.hallMenuBtn, 0.3, { rotation: 180 });
			}
			this.setShowTween(this.isShowMenu, 2);
		}
		// private _onNoticesImgBeGin(evt: egret.TouchEvent) {
		// 	this._view.noticesImg.scaleX = 0.95;
		// 	this._view.noticesImg.scaleY = 0.95;
		// }
		// private _onNoticesImgEnd(evt: egret.TouchEvent) {
		// 	this._view.noticesImg.scaleX = 1;
		// 	this._view.noticesImg.scaleY = 1;
		// }
		public removeEvent(): void {
			this._view.swiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onSwiBtn, this)
			this._view.hallMenuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onHallMenu, this);
			// this._view.noticesImg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onNoticesImgBeGin, this);
			// this._view.noticesImg.removeEventListener(egret.TouchEvent.TOUCH_END, this._onNoticesImgEnd, this);
		}

		public destroy(): void {
			this.removeEvent();
		}
	}
}