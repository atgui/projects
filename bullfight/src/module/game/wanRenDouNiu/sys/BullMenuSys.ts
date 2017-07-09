module wanRenDouNiu {
	export class BullMenuSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}
		private _view: WanRenDouNiuView;

		private _menuButton: eui.Image;
		private _menuGroup: eui.Group;
		private _topGroup: eui.Group;

		private _helpButton: eui.Image;
		private _shopButton: eui.Image;
		private _settingButton: eui.Image;

		private _sourceX: number;

		public build() {
			this._menuButton = this._view["menuButton"];
			this._menuGroup = this._view["menuGroup"];
			this._topGroup = this._view["topGroup"];

			this._helpButton = this._view["helpButton"];
			this._shopButton = this._view["shopButton"];
			this._settingButton = this._view["settingButton"];
			// this._menuGroup.visible = false;
			this._sourceX = this._menuGroup.x;

			this._menuGroup.x += this._menuGroup.width;
			this._isTouch = false;
			this.addEvent();
		}
		public addEvent() {
			this._menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchMenu, this);
			this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchHelpButton, this);
			this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchShopButton, this);
			this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchSettingButton, this);
		}

		private _touchHelpButton(e: egret.TouchEvent) {
			console.log("help...");
		}
		private _touchShopButton(e: egret.TouchEvent) {
			console.log("shop...");
		}
		private _touchSettingButton(e: egret.TouchEvent) {
			console.log("setting...");
		}
		private _isTouch: boolean;
		/**
		 * 点击菜单时
		 */
		private _touchMenu(e: egret.TouchEvent) {
			this._isTouch = !this._isTouch;
			this._menuButton.source = this._isTouch == true ? "wr_select_check_png" : "wr_select_check_0_png";

			var n = this._isTouch == true ? this._sourceX : this._sourceX + this._menuGroup.width;
			TweenMax.to(this._menuGroup, 0.3, { x: n, ease: Back.easeOut });
		}

		public removeEvent() {
			this._menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchMenu, this);
			this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchHelpButton, this);
			this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchShopButton, this);
			this._helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchSettingButton, this);
		}
		public destroy() {
			this.removeEvent();
			this._view = null;
		}

	}
}