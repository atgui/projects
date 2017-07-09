class EffectUtils {
	public constructor() {
	}
	/**
	 * 回弹缩放  弹出  居中 
	 */
	public static ScaleElastic(tagObj) {
		var stageWidth: number = LayerManager.instance.stageWidth;
		var stageHeight: number = LayerManager.instance.stageHeight;
		var scaleNum: number = 0.6;
		var oldX: number = stageWidth / 2 - scaleNum * tagObj.width / 2;
		var oldY: number = stageHeight / 2 - scaleNum * tagObj.height / 2;
		var newX: number = tagObj.x;
		var newY: number = tagObj.y;
		tagObj.x = oldX;
		tagObj.y = oldY;
		tagObj.scaleX = scaleNum;
		tagObj.scaleY = scaleNum;
		TweenMax.to(tagObj, 0.2, { x: newX, y: newY, scaleX: 1, scaleY: 1, ease: Back.easeOut });
	}


	/**
	 * x轴居中 出下往上慢慢显示到中间  然后由中往上慢慢消失   常规提示框用
	 */
	public static upShowUpHide(tagObj: any, completeFun: Function) {
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: tagObj });
		var oy = tagObj.y;// - 50;
		var ny = oy;// - 100;
		tagObj.alpha = 0;
		var tw1: TimelineLite = new TimelineLite();
		tw1.append(new TweenLite(tagObj, 0.4, { y: oy, alpha: 1 }));
		tw1.append(new TweenLite(tagObj, 1, { alpha: 1 }));
		tw1.append(new TweenLite(tagObj, 0.4, { y: ny, alpha: 0 }));

		tween.append(tw1);

		tween.play();
	}
	/**
	 * 转盘动画
	 */
	public static turntableAnim(obj: any, endrot: number, completeFun: Function, onUpdate: Function, tagObj: any) {
		var dObj = { rotation: 0 };
		dObj.rotation = obj.rotation;
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: tagObj, onUpdate: onUpdate, onUpdateScope: tagObj, onUpdateParams: [dObj, "rotation"] });
		tween.insert(new TweenLite(dObj, 10, { rotation: endrot, ease: Cubic.easeInOut }));
		tween.play();
		return tween;
	}


	/**
	 * 转盘游戏的旋转
	 */
	public static turntableRunStart(tagObj0: any, tagObj1: any, completeFun: Function, onCompleteObj: any, endRot: number) {
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: onCompleteObj });
		tween.insert(new TweenLite(tagObj0, 8, { rotation: -endRot, ease: Cubic.easeInOut }));
		tween.insert(new TweenLite(tagObj1, 8, { rotation: endRot, ease: Cubic.easeInOut }));
		tween.play();
	}


	/**
	 * 上庄  动画
	 */
	public static kamishoEff(tagObj: any, endPoint: egret.Point, completeFun: Function, onCompleteObj: any) {
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: onCompleteObj });
		var dy: number = tagObj.y - 150;
		tween.append(new TweenLite(tagObj, 0.5, { scaleX: 1.5, scaleY: 1.5, y: dy, ease: Back.easeOut }));
		tween.append(new TweenLite(tagObj, 1, { x: endPoint.x, y: endPoint.y, ease: Back.easeIn }));
		tween.append(new TweenLite(tagObj, 0.5, { scaleX: 1, scaleY: 1, ease: Back.easeIn }));
		tween.play();
	}
	//下注, ease: Cubic.easeInOut 
	public static startBetEff(tagObj: any, endPoint: { x: number, y: number }, completeFun: Function, onCompleteObj: any, time: number = 0.2) {
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: onCompleteObj });
		tween.append(new TweenLite(tagObj, 0.2, { x: endPoint.x, y: endPoint.y }));
		tween.play();
	}
	/**
	 * 发牌
	 */
	public static startBetEff2(tagObj: eui.Image, endPoint: { x: number, y: number }, completeFun: Function, onCompleteObj: any, time: number = 0.2) {
		//scaleX: 1, scaleY: 1,rotation: 360 
		tagObj.anchorOffsetX = tagObj.width / 2;
		tagObj.anchorOffsetY = tagObj.height / 2;
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: onCompleteObj });
		tween.append(new TweenLite(tagObj, time, { x: endPoint.x, y: endPoint.y, scaleX: 1, scaleY: 1, rotation: 360 }));
		tween.play();
	}
	//下注, ease: Back.easeIn 
	public static startBetEff1(tagObj: any, endPoint: { x: number, y: number }, completeFun: Function, onCompleteObj: any, time: number = 0.2) {
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: onCompleteObj });
		tween.append(new TweenLite(tagObj, time, { x: endPoint.x, y: endPoint.y }));
		tween.play();
	}

	/**
	 * 展现牌  
	 */
	public static showCard(tagObjArr: Array<any>, endSkew: number, dscaleX: number, completeFun: Function, tagObj: any) {
		var tween: TimelineLite = new TimelineLite({ onComplete: completeFun, onCompleteScope: tagObj });
		for (var i: number = 0; i < tagObjArr.length; i++) {
			var tagObj = tagObjArr[i];
			tween.insert(new TweenLite(tagObj, 0.2, { skewY: endSkew, scaleX: dscaleX }));
		}
		tween.play();
	}


}