class WanRenDouNiuScene implements IScene {
	public constructor() {
	}
	private _view: wanRenDouNiu.WanRenDouNiuView;
	public build(): void {
		this._view = new wanRenDouNiu.WanRenDouNiuView();
		//AdaptiveManager.instance.zoomByTopAndBottomXCt(this._view);
		LayerManager.instance.gameLayer.addChild(this._view);
	}
    public destroy(): void {
		this._view.destroy();
	}
}