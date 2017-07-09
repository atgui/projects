module wanRenDouNiu {
	export class BullNoticeSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}
		private _view: WanRenDouNiuView;

		private _noticeGroup: eui.Group;
		private _sysNoticeLabel: eui.Label;

		private _systemGroup: eui.Group;

		public build() {
			this._noticeGroup = this._view["noticeGroup"];
			this._sysNoticeLabel = this._view["sysNoticeLabel"];
			this._systemGroup = this._view["systemGroup"];

			var sp = new egret.Shape();
			sp.graphics.beginFill(0x000000);
			sp.graphics.drawRect(this._noticeGroup.x, this._noticeGroup.y, this._noticeGroup.width, this._noticeGroup.height);
			sp.graphics.endFill();
			this._systemGroup.addChild(sp);

			this._noticeGroup.mask = sp;


			this._lsRun();
			this.addEvent();
		}
		public addEvent() {
			var commonControl = common.CommonControl.instance;
			commonControl.addEventListener("trumpet", this._trumpet, this);
		}

		/**
		 * 系统公告
		 */
		private _trumpet(e: GameEvent) {
			var commonControl = common.CommonControl.instance;
			this._sysNoticeLabel.textFlow = new egret.HtmlTextParser().parser(commonControl.trumpetStr);

			this._sysNoticeLabel.x = this._noticeGroup.x + this._noticeGroup.width;
		}
		private _nTime: number;
		private _lsRun() {
			var __self = this;
			this._nTime = setInterval(() => {
				__self._sysNoticeLabel.x -= 3;
				if (__self._sysNoticeLabel.x <= -__self._sysNoticeLabel.width) {
					__self._sysNoticeLabel.x = __self._noticeGroup.x + __self._noticeGroup.width;
				}
			}, 50);
		}

		public removeEvent() {
			var commonControl = common.CommonControl.instance;
			commonControl.removeEventListener("trumpet", this._trumpet, this);
		}

		public destroy() {
			this.removeEvent();
			this._view = null;
		}

	}
}