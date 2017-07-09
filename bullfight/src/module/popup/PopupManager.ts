/**
 * 弹窗管理器
 */
class PopupManager {
	public constructor() {
	}
	private static _instance: PopupManager;
    public static get instance(): PopupManager {
        this._instance = this._instance || new PopupManager;
        return this._instance;
    }
	private _popupList: Array<popup.PopupBase>;
	private _bg: egret.Shape;
	private _isResponseBg: boolean;//是否响应背景点击事件
	public start(): void {
		///LayerManager.instance.popupLayer.addChild(this._loadingLayer);
		this._popupList = new Array<popup.PopupBase>();
		this._bg = new egret.Shape();
        this._bg.graphics.beginFill(0x000000, 0.8);
		//var w = window.innerWidth;
		// var h = window.innerHeight;
		var w = LayerManager.instance.stageWidth;
        var h = LayerManager.instance.stageHeight;
        this._bg.graphics.drawRect(0, 0, w, h);
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this._tapBg, this);
		this._isResponseBg = true;
	}
	private _tapBg(e: egret.TouchEvent) {
		if (this._isResponseBg == true) {
			this._delLastPop();
			this._checkBg();
		}
    }
	/**
	 * 加入一个弹窗
	 */
    public addPop(pop: popup.PopupBase,
		type: popup.PopupType = popup.PopupType.OPEN_NORMAL,
		showBlack: boolean = true,
		center: boolean = true,
		effType: popup.PopupInEffType = popup.PopupInEffType.SCALE_L_S_L_N,
		isResponseBg: boolean = true) {
		switch (type) {
			case popup.PopupType.OPEN_NORMAL:
				break;
			case popup.PopupType.OPEN_HIDE_PREV:
				this._delLastPop();
				break;
			case popup.PopupType.OPEN_HIDE_ALL:
				this.delAllPop();
				break;
		}
		this._popupList.push(pop);
		LayerManager.instance.popupLayer.addChild(pop);
		var idex: number = this._popupList.indexOf(pop);
		if (showBlack == true) {
			this._checkBg();
		} else if (this._bg.parent) {
			LayerManager.instance.popupLayer.removeChild(this._bg);
		}

		if (center == true) {
			AdaptiveManager.instance.zoomAndCenter(pop);
		}

		switch (effType) {
			case popup.PopupInEffType.NULL:
				break;
			case popup.PopupInEffType.SCALE_L_S_L_N:
				EffectUtils.ScaleElastic(pop);
				break;
		}
		this._isResponseBg = isResponseBg;
    }
	/**
	 * 移除一个弹窗
	 */
	public removePop(pop: popup.PopupBase, type: popup.PopupType = popup.PopupType.CLOSE_NORMAL) {
		switch (type) {
			case popup.PopupType.CLOSE_NORMAL:
				var idex: number = this._popupList.indexOf(pop);
				this._popupList.splice(idex, 1);
				pop.destroy();
				break;
			case popup.PopupType.CLOSE_ALL:
				this.delAllPop();
				break;
		}
		this._checkBg();
	}
	private _delLastPop() {
		if (this._popupList.length > 0) {
			var pop: popup.PopupBase = this._popupList.pop();
			pop.destroy();
		}
    }
	/**
	 * 移除所有弹窗
	 */
	public delAllPop() {
		for (var i: number = this._popupList.length - 1; i >= 0; i--) {
			this._delLastPop();
		}
		this._checkBg();
    }

	private _checkBg(): void {
		if (this._popupList.length <= 0 && this._bg.parent) {
			LayerManager.instance.popupLayer.removeChild(this._bg);
		} else if (this._popupList.length > 0) {
			LayerManager.instance.popupLayer.addChildAt(this._bg, 99);
			var dpop: popup.PopupBase = this._popupList[this._popupList.length - 1];
			LayerManager.instance.popupLayer.setChildIndex(dpop, 99);
		}
	}

}
