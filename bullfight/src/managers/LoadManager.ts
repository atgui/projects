class LoadManager {
	public constructor() {
	}


    /**
     * 单例模式
     */
    private static _instance: LoadManager;
    public static get instance(): LoadManager {
        this._instance = this._instance || new LoadManager;
        return this._instance;
    }

	public resLoad:load.RESLoad;
	public start(){
		this.resLoad=new load.RESLoad();
	}
}