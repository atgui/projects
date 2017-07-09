class FontManager {
	public constructor() {
	}

	/**
	* 单例模式
	*/
    private static _instance: FontManager;
    public static get instance(): FontManager {
        this._instance = this._instance || new FontManager;
        return this._instance;
    }

	public font_0: egret.BitmapFont;
	public font_1: egret.BitmapFont;
	public font_3: egret.BitmapFont;
	public font_gold_0: egret.BitmapFont;
	public font_gold_1: egret.BitmapFont;
	public font_gold_2: egret.BitmapFont;
	public start(): void {
		this.font_0 = RES.getRes("font_0_fnt");
		this.font_1 = RES.getRes("font_1_fnt");
		this.font_3 = RES.getRes("font_3_fnt");
		this.font_gold_0 = RES.getRes("font_gold_0_fnt");
		this.font_gold_1 = RES.getRes("font_gold_1_fnt");
		this.font_gold_2 = RES.getRes("font_gold_2_fnt");
	}
}