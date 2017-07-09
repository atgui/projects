module wanRenDouNiu {
	/**
	 * 更新用户信息
	 */
	export class UpdatePlayerSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}

		private _view: WanRenDouNiuView;

		private _nameLabel: eui.Label;
		private _goldLabel: eui.Label;
		private _headerIcon: eui.Image;

		private _userInfoGroup: eui.Group;
		private _sp: egret.Shape;

		public build() {
			this._nameLabel = this._view["usernameLabel"];
			this._goldLabel = this._view["goldLabel"];
			this._headerIcon = this._view["headerIcon"];
			this._userInfoGroup = this._view["userInfoGroup"];

			this._sp = new egret.Shape();
			this._sp.graphics.beginFill(0x000000);
			this._sp.graphics.drawCircle(this._headerIcon.x + this._headerIcon.width / 2, this._headerIcon.y + this._headerIcon.height / 2, 40);
			this._sp.graphics.endFill();
			this._sp.touchEnabled = false;
			this._userInfoGroup.addChild(this._sp);
			this._headerIcon.mask = this._sp;

			this._updatePlayer(null);

			this.addEvent();
		}

		public addEvent() {
			this._headerIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchHeader, this);

			var mySelf = player.PlayerControl.instance.mySelf;
			mySelf.addEventListener(GameEvent.CHANGE, this._updatePlayer, this);
		}
		public removeEvent() {
			this._headerIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchHeader, this);

			var mySelf = player.PlayerControl.instance.mySelf;
			mySelf.removeEventListener(GameEvent.CHANGE, this._updatePlayer, this)
		}

		private _touchHeader(e: egret.TouchEvent) {
			PopupManager.instance.addPop(new PlayerInfoPopup());
		}

		private _updatePlayer(e: GameEvent) {
			var mySelf = player.PlayerControl.instance.mySelf;
			this._nameLabel.text = mySelf.nickname;
			this._goldLabel.text = mySelf.goldcoins;
			var __self = this;
			RES.getResByUrl(mySelf.portrait, (data) => {
				__self._headerIcon.texture = data;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		public destroy() {
			this.removeEvent();
			this._view = null;
		}

	}
}