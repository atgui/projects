module wanRenDouNiu {
	export class ZiMovieEff extends eui.Component implements IView {
		public constructor(url: string) {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this._onAddToStage, this);
			this.skinName = url;
		}
		private _onAddToStage(): void {
			this.build();
		}
		public build() {
			LayerManager.instance.frameLayer.addChild(this);
			AdaptiveManager.instance.zoomAndCenter(this);
			// this.y = window.innerHeight / 2 - this.height / 2;
			// this.y = LayerManager.instance.baseContainer.height / 2 - this.height;
			this.x = -720;
			var tween: TimelineLite = new TimelineLite({ onComplete: this._comeBack, onCompleteScope: this });
			tween.append(new TweenLite(this, 0.2, { x: 0 }));///, ease: Back.easeOut 
			tween.append(new TweenLite(this, 1.1, { x: 0 }));
			tween.append(new TweenLite(this, 0.2, { x: 720 }));//, ease: Back.easeIn 
			// tween.append(new TweenLite(this, 0.5, { x: 0 }));
			// tween.append(new TweenLite(this, 1, { x: 0 }));
			// tween.append(new TweenLite(this, 0.5, { x: this.width }));
			// for (var i: number=0; i < 4; i++) {
			// 	var item:eui.Image=this["zi_"+i];
			// 	item.scaleX=0.001;
			// 	tween.append(new TweenLite(item, 0.2, { scaleX: 1 }));
			// }
			// tween.append(new TweenLite(this, 1, { }));			
			tween.play();
			SoundManager.instance.currentround();
		}
		public addEvent() {

		}
		public removeEvent() {

		}
		private _comeBack() {
			this.destroy();
		}
		public destroy() {
			if (this && this.parent) {
				this.parent.removeChild(this);
			}
		}
	}
}