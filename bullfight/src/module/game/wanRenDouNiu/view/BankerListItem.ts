module wanRenDouNiu {
	export class BankerListItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = "skins/bullfight/view/BankerListItemSkin.exml";
		}
		private _onAddToStage(): void {
			this.build();
		}
		private vipicon: eui.Image;//等级图标
		private nickNameLabel: eui.Label;//昵称
		private goldLabel: eui.Label;//金币
		private headIcon:common.CommonHead;//头像
		public build(): void {
			this.addEvent();
		}
		public dataChanged() {
			// var itemin: number = this.itemIndex + 1;
			var index = this.data.index;//标识
			if (index == 1) {
				var dataitem: common.BullServer_Result_Item = this.data.data;//数据
				var nickname = dataitem["4"];
				var goldnum: number =dataitem.winScore;// dataitem["5"];
				this.nickNameLabel.text =dataitem.name;// nickname;
				this.goldLabel.text = goldnum.toString();
			} else if (index == 2) {
				var bsritem: common.BullServer_Result_Item = this.data.data;//数据
				this.nickNameLabel.text = bsritem.name;
				this.goldLabel.text = bsritem.winScore.toString();
			}
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