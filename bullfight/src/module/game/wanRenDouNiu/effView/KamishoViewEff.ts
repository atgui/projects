module wanRenDouNiu {
	export class KamishoViewEff extends egret.Sprite implements IView {
		public constructor(url: string,moveComplete:Function,thisObj:any) {
			super();
			this._url = url;
			this._moveComplete=moveComplete;
			this._moveObj=thisObj;
			this.build();
		}
		private _url: string;
		private _headView: common.CommonHead;
		private _moveComplete:Function;
		private _moveObj:Function;
		public build() {
			this._headView = new common.CommonHead();
			this.addChild(this._headView);
			this.addEvent();
			this._headView.skinName = "skins/common/CommonHeadSkin.exml";
		}
		public addEvent() {
			this._headView.addEventListener(GameEvent.INIT_COMPLETE, this._headComplete, this);
		}
		public removeEvent() {
			this._headView.removeEventListener(GameEvent.INIT_COMPLETE, this._headComplete, this);
		}
		private _headComplete(e: GameEvent) {
			this._headView.setHeadPortrait(this._url);
			this.x=467;
			this.y=1230-AdaptiveManager.instance.reducedHeight;
			this.anchorOffsetX=67;
			this.anchorOffsetY=67;
			var endPoint:egret.Point=new egret.Point(154,52);
			EffectUtils.kamishoEff(this,endPoint,this.destroy,this);
			LayerManager.instance.frameLayer.addChild(this);
		}
		public destroy() {
			this._moveComplete.apply(this._moveObj,[this._headView.headTexture]);
			this.removeEvent();
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}