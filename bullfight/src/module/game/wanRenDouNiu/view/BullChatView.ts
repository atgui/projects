module wanRenDouNiu {
	export class BullChatView extends eui.Component {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/bullfight/view/BullChatViewSkin.exml";
		}

		private _onComplete(e: eui.UIEvent) {
			this.build();
		}

		private _bullChatSys: BullChatSys;
		public chatGroup: eui.Group;

		public sp: egret.Shape;

		public build() {
			this._bullChatSys = new BullChatSys(this);
			LayerManager.instance.gameLayer.addChildAt(this, 99);
			AdaptiveManager.instance.relativeByBottom(this.chatGroup);

			this.sp = new egret.Shape();
			this.sp.graphics.beginFill(0x000000, 0.5);
			this.sp.graphics.drawRect(0, 0, this.width, this.height);
			this.sp.graphics.endFill();
			this.addChildAt(this.sp, 0);
			this.sp.touchEnabled = true;

			this.addEvent();
		}
		public addEvent() {
			this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchThis, this);
		}
		public removeEvent() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.sp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchThis, this);
		}

		private _touchThis(e: egret.TouchEvent) {
			this.dispatchEvent(new GameEvent("CHAT_DESTROY"));
		}

		public destroy() {
			this.removeEvent();
			if(this.sp){
				this.sp.graphics.clear();
			}
			this.sp=null;
			if (this._bullChatSys) {
				this._bullChatSys.destroy();
			}
			this._bullChatSys = null;
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}

	}
}