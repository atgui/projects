module login {
	export class LoginRegisterPopup extends popup.PopupBase implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/login/LoginRegisterPopupSkin.exml";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
		private _onComplete(): void {
			this.build();
		}

		public build(): void {

		}
		public addEvent(): void {

		}
		public removeEvent(): void {

		}
		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}
