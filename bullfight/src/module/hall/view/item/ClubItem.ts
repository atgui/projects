module hall {
	export class ClubItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/ClubItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		public build(): void {
			this.addEvent();
		}
		private headIco:eui.Image;
		private nameLabel:eui.Label
		private memberNumLabel:eui.Label;
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