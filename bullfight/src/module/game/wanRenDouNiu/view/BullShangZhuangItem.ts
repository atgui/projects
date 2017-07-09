module wanRenDouNiu {
	export class BullShangZhuangItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/view/BullShangZhuangItemSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}

		public usernameLabel: eui.Label;
		public goldLabel: eui.Label;


		public build(): void {
			this.addEvent();
		}

		public addEvent(): void {

		}
		public removeEvent(): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
		}
		//更新
		public dataChanged() {
			var obj = this.data;
			this.usernameLabel.text = obj["4"];
			this.goldLabel.text = obj["5"];
		}

		public destroy(): void {
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}