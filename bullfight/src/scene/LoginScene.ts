/**
 *
 * @author 
 * 游戏主场景
 */
class LoginScene implements IScene{
    private _view: login.LoginView;

    public constructor() {
    }

    public build(): void {
        this._view = new  login.LoginView();
        LayerManager.instance.gameLayer.addChild(this._view);

    }
    public destroy(): void {
        this._view.destroy();
    }
}
