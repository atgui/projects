class AdaptiveManager {
	/**
	 * 自适应 相对于屏幕宽度等比拉伸   自适应屏幕高度
	 */
	public constructor() {
	}
	private static _instance: AdaptiveManager;
	public static get instance(): AdaptiveManager {
		this._instance = this._instance || new AdaptiveManager;
		return this._instance
	}

	private _reducedHeight: number;//减少的高度
	public start(): void {
		var defW: number = LayerManager.instance.stageWidth;
		var defH: number = LayerManager.instance.stageHeight;
		var screenW = window.innerWidth;
		var screenH = window.innerHeight;
		var dSW: number = defW / screenW;//1.....
		this._reducedHeight = (defH - screenH * dSW) / 2;
	}
	/**
	 * 返回差距
	 */
	public get reducedHeight(): number {
		var defW: number = LayerManager.instance.stageWidth;
		var defH: number = LayerManager.instance.stageHeight;
		var screenW = window.innerWidth;
		var screenH = window.innerHeight;
		var dSW: number = defW / screenW;
		this._reducedHeight = (defH - screenH * dSW) / 2;
		return 2 * this._reducedHeight;
	}
	/**
	 * 返回缩放比
	 */
	public get scale(): number {
		var defW: number = LayerManager.instance.stageWidth;
		var screenW = window.innerWidth;
		var dSW: number = screenW / defW;
		return dSW;
	}
	/**
	 * 相对于顶部的距离不变 ;
	 */
	public relativeByTop(dv: egret.DisplayObject): void {
		dv.y = dv.y + this.reducedHeight;
	}

	/**
	 * 相对于底部的距离不变 ;
	 */
	public relativeByBottom(dv: egret.DisplayObject): void {
		dv.y = dv.y - this.reducedHeight;
	}

	/**
	 * 居中 ;
	 */
	public zoomAndCenter(dv: egret.DisplayObject): void {
		var defW: number = LayerManager.instance.stageWidth;
		var defH: number = LayerManager.instance.stageHeight - this.reducedHeight;
		dv.x = (defW - dv.width) / 2;
		dv.y = (defH - dv.height) / 2;
	}


	/**
	 * 相对于顶部的距离不变 ;并且相对于底部的距离不变  自适应缩放 X并居中
	 */
	public zoomByTopAndBottomXCt(dv: egret.DisplayObject): void {
		var oldw: number = dv.width;
		var oldH: number = dv.height;
		var newH: number = this._reducedHeight > 0 ? dv.height - this._reducedHeight * 2 : dv.height;
		var dScale: number = newH / dv.height;
		var defW: number = LayerManager.instance.stageWidth;
		dv.scaleX = dScale;
		dv.scaleY = dScale;
		dv.x = dv.x + defW * (1 - dScale) / 2;
		dv.y = dv.y;
	}


	/**
	 * 返回自适应后的视窗高度
	 */
	public get adapHeight(): number {
		var defH: number = LayerManager.instance.stageHeight;
		return defH - this.reducedHeight;
	}

}