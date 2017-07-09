module hall {
	export class CharmListItem extends eui.ItemRenderer implements IView {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onComplete, this);
			this.skinName = "skins/hall/item/FortuneListItemSkin.exml";
		}
		private _onComplete(): void {
			this.build();
		}
		public build(): void {
			this.addEvent();
		}
		private rankingIco: eui.Image;//名次图标
		private userHead: common.CommonHead;//头像
		private nickNameLabel: eui.Label;//昵称
		private goldLabel: eui.Label;//金币数

		public dataChanged() {
			var clmod: common.CharmListModel = this.data;
			this.nickNameLabel.text = clmod.nickname;
			this.goldLabel.text = clmod.charm.toString();
			this.userHead.setHeadPortrait(clmod.portrait);
			var ranking: number = this.itemIndex + 1;
			if (ranking < 5) {
				this.rankingIco.source = RES.getRes("vip_icon_" + ranking + "_png");
			} else {
				this.rankingIco.source = RES.getRes("vip_icon_0_png");
			}
			if (ranking == 1) {
				this.userHead.setHeadBG("profile_avatar_bg_frame_2_png");
			} else {
				this.userHead.setHeadBG("profile_avatar_bg_frame_1_png");
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