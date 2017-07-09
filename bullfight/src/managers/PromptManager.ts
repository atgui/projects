/**
 *
 * @author 
 *
 */
class PromptManager {
	public constructor() {
	}
	
    /**
     * 单例模式
     * */
                
    private static _instance: PromptManager;
    public static get instance(): PromptManager {
        this._instance = this._instance || new PromptManager;
        return this._instance;
    }	
    public start():void{
        this._prompt = null;
        this._bg = new egret.Sprite();
        this._bg.graphics.beginFill(0x000000,0.6);
        this._bg.graphics.drawRect(0,0,LayerManager.instance.stage.stageWidth,LayerManager.instance.stage.stageHeight);
        this._bg.graphics.endFill();
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this._tapBg,this);
    }
    private _tapBg(e:egret.TouchEvent){
        this.hide();
    }
    
    private _bg: egret.Shape;
    private  _prompt: IView;
    
    public  show(prompt: IView,showEnter:boolean=false){
        if(this._prompt){
            this.hide();
        }
        LayerManager.instance.frameLayer.addChildAt(this._bg,0);
        this._prompt = prompt;
    }
    
    public  hide(){
        if(this._prompt){
            this._prompt.destroy();
        }
        if(this._bg && this._bg.parent){
            LayerManager.instance.frameLayer.removeChild(this._bg);
        }
        this._prompt = null;
    }
    
    public get havePrompt():boolean{
        return this._prompt != null;
    }
}
