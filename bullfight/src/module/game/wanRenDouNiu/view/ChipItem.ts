module wanRenDouNiu {
	export class ChipItem extends eui.Image {
		public constructor(n: number, source?: string | egret.Texture) {
			super(source);
			this.chipNum = n;
			this.touchEnabled = true;
		}
		public chipNum: number;
	}
}