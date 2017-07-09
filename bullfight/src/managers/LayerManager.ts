/**
 *
 * @author 
 *
 */
class LayerManager {
    public constructor() {
    }
    /**
    *
    * 设置主容器
    *
    */

    /**
     * 单例模式
     */
    private static _instance: LayerManager;
    public static get instance(): LayerManager {
        this._instance = this._instance || new LayerManager;
        return this._instance;
    }

    public stageWidth: number = 720;
    public stageHeight: number = 1280;

    private _baseContainer: egret.DisplayObjectContainer;
    public set baseContainer(value: egret.DisplayObjectContainer) {
        this._baseContainer = value;
        this.stage = this._baseContainer.stage;



        //this.stageWidth = window.innerWidth;
        //this.stageHeight = window.innerHeight;
        // this.stage.setContentSize(window.innerWidth, window.innerHeight);


        this.gameLayer = new egret.Sprite();
        this._baseContainer.addChild(this.gameLayer);

        this.frameLayer = new egret.Sprite();
        this._baseContainer.addChild(this.frameLayer);

        this.popupLayer = new egret.Sprite();
        this._baseContainer.addChild(this.popupLayer);

        this.tipsLayer = new egret.Sprite();
        this._baseContainer.addChild(this.tipsLayer);

        //this.div2D = document.getElementById("Div2D");




    }
    public get baseContainer(): egret.DisplayObjectContainer {
        return this._baseContainer;
    }


    private div2D: any;



    /**
    *
    * 设置层级容器
    *
    */
    public stage: egret.Stage;

    public gameLayer: egret.Sprite;
    public frameLayer: egret.Sprite;
    public popupLayer: egret.Sprite;
    public tipsLayer: egret.Sprite;



    /*
        private _layer3D: egret3d.Egret3DCanvas;
        private _view3DX: number = 0;
        private _view3DY: number = 107;
        private _view3DW: number = 640;
        private _view3DH: number = 400;
        private _view3D: egret3d.View3D;
        private get layer3D(): egret3d.Egret3DCanvas {
            return this._layer3D;
        }
        public get view3D(): egret3d.View3D {
            return this._view3D;
        }*/
    public start3D(): void {
        /*  this._layer3D = new egret3d.Egret3DCanvas();
 
         this._layer3D.x = 0;
         this._layer3D.y = 0;
         this._layer3D.width = window.innerWidth;
         this._layer3D.height = window.innerHeight;
 
 
         this._view3D = new egret3d.View3D(0, 0, this._view3DW, this._view3DH);
         this._view3D.camera3D.fieldOfView = 50;
         this._view3D.camera3D.near = 0.3;
         this._view3D.camera3D.far = 10000;
         this._view3D.camera3D.lookAt(new egret3d.Vector3D(0, 0, 0), new egret3d.Vector3D(0, 0, 2000));
         this._view3D.backColor = 0xffffffff;
         this._layer3D.addView3D(this._view3D);
 
         this._onWindowResize();
         // egret3d.Input.addEventListener(egret3d.Event3D.RESIZE, this._onWindowResize, this);
         this._layer3D.start();*/

    }
    private _onWindowResize(): void {
        /* this._layer3D.width = window.innerWidth;
        this._layer3D.height = window.innerHeight;

        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;


        var scale: number = window.innerWidth / this._view3DW;
         this._layer3D.width = this._view3DW * scale;
         this._layer3D.height = this._view3DH * scale;
         this._view3D.width = this._view3DW * scale;
         this._view3D.height = this._view3DH * scale;*/
    }
    public reviseView3D(): void {
        /*var deucH: number = AdaptiveManager.instance.reducedHeight;
        var scale: number = AdaptiveManager.instance.scale;
        this._view3D.width = this._view3DW * scale;
        this._view3D.height = this._view3DH * scale;
        this._view3D.y = (this._view3DY ) * scale;*/
    }


}
