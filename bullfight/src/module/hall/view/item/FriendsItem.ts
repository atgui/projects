module hall {
	export class FriendsItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/FriendsItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		public build(): void {
			this.addEvent();
		}
		private headIco:eui.Image;
		public dataChanged(){

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