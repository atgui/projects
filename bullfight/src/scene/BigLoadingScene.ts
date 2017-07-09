/**
 *
 * @author 
 * 游戏主场景
 */
class BigLoadingScene implements IScene {
    private _view: load.BigLoading;

    public constructor() {
    }

    public build(): void {
        this._view = new load.BigLoading();
        LayerManager.instance.gameLayer.addChild(this._view);

    }
    public destroy(): void {
        this._view.destroy();
    }
}
