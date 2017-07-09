/**
 *
 * @author 
 *
 */

class SceneManager {
    
    private  _screen:IScene;
    private  _sceneDic: string[];
    private  _nextStr:string;
    private  _oldStr:string;
    
	public constructor() {
	}
    private static _instance: SceneManager;
    public static get instance(): SceneManager {
        this._instance = this._instance || new SceneManager;
        return this._instance;
    }
    public  addScene(name:string,scene:IScene):void{
        if(!this._sceneDic){
            this._sceneDic = new Array<string>();
        }
        this._sceneDic[name]=scene;
    }
    public  show(str:string):void
    {
        this._oldStr=this._nextStr
        this._nextStr=str;
        if(this._screen){
            this. _screen.destroy();
        }
        this._screen=this._sceneDic[this._nextStr];
        this._screen.build();
    }
    public  showOld():void
    {
        if(this._oldStr&&this._oldStr!=""){
            this.show(this._oldStr);
        }
    }
    public  get nowScene():IScene{
        return this._screen;
    }
}
