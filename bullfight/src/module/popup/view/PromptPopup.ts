module popup {
	/**
	 * 常规提示框  以后扩展
	 */
	export class PromptPopup extends egret.Sprite implements IView {
		public constructor() {
			super();
			this.build();
		}

		private _bg: eui.Image;
		private _textList: Array<egret.TextField>;
		private _strArr: Array<egret.ITextElement>;

		private _BASE_W: number = 636;
		private _BASE_H: number = 32;

		public build(): void {
			this._bg = new eui.Image(RES.getRes("init_prompt_bg_png"));
			this._textList = new Array<egret.TextField>();
			this.addChild(this._bg);
			this.visible = false;
			LayerManager.instance.tipsLayer.addChild(this);
			this.touchEnabled = false;
			this.touchChildren = false;
		}
		private _showIn() {
			this.x = (LayerManager.instance.stageWidth - this._BASE_W) / 2;
			this.y = (LayerManager.instance.stageHeight - this.height) / 2;
			this.visible = true;
			EffectUtils.upShowUpHide(this, this.destroy);
		}
		public showSimple(strList: string[]): void {
			for (var i: number = 0; i < strList.length; i++) {
				var textF: egret.TextField = new egret.TextField();
				textF.size = 32;
				textF.textColor = 0X000000;
				textF.bold = true;
				textF.text = strList[i];
				textF.x = (this._BASE_W - textF.width) / 2;
				textF.y = this._BASE_H * (i + 1);
				this.addChild(textF);
			}
			this._bg.height = (strList.length + 2) * this._BASE_H;
			this._showIn();
		}
		/**
		 * 自定义显示
		 */
		public showHtmlSimple(strList: Array<string>) {
			for (var i: number = 0; i < strList.length; i++) {
				var textF: egret.TextField = new egret.TextField();				
				textF.textFlow = new egret.HtmlTextParser().parser(strList[i]);//strList[i].txt;
				textF.textColor =0x6666;
				textF.size = 20;
				//textF.size = 32;
				textF.bold = true;
				textF.x = (this._BASE_W - textF.width) / 2;
				textF.y = this._BASE_H * (i + 1);
				this.addChild(textF);
			}
			this._bg.height = (strList.length + 2) * this._BASE_H;
			this._showIn();
		}
		public showFlow(strList: Array<Array<egret.ITextElement>>): void {
			for (var i: number = 0; i < strList.length; i++) {
				var textF: egret.TextField = new egret.TextField();
				textF.size = 20;
				textF.textFlow = strList[i];
				textF.x = (this._BASE_W - textF.width) / 2;
				textF.y = this._BASE_H * (i + 1);
				this.addChild(textF);
			}
			this._bg.height = (strList.length + 2) * this._BASE_H;
			this._showIn();
		}
		public addEvent(): void {
			
		}
		public removeEvent(): void {

		}
		public destroy(): void {
            this.removeEvent();
            if (this && this.parent) {
                this.parent.removeChild(this);
            }
		}
	}
}