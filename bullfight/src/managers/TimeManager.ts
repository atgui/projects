/**
 *
 * @author 
 *
 */
interface IFunctionHan {
    fuc: Function;
    evtTag: any;
}

class TimeManager {
    public constructor() {
    }
    /**
    * 单例模式
    **/
    private static _instance: TimeManager;
    public static get instance(): TimeManager {
        this._instance = this._instance || new TimeManager;
        return this._instance;
    }
    private _timer: egret.Timer;
    private _hanlderDic: Array<IFunctionHan>;
    private _secondDic: Array<IFunctionHan>;
    private _secondNum: number;
    public delayTime: number;
    private _layerStage: egret.Stage
    public start(dt: number = 25): void {
        this._secondNum = egret.getTimer();
        this._timer = new egret.Timer(dt);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerRun, this);
        this._hanlderDic = new Array<IFunctionHan>();
        this._secondDic = new Array<IFunctionHan>();
        this._timer.start();
        this._layerStage = LayerManager.instance.stage;
        this.delayTime = 1000 / this._layerStage.frameRate;
        //  this._layerStage.addEventListener(egret.Event.ENTER_FRAME, this._timerRun, this)
    }

    private _timerRun(e: egret.TimerEvent): void {
        if (egret.getTimer() - this._secondNum >= 1000) {
            this._secondNum = this._secondNum + 1000;
            for (var i = 0; i < this._secondDic.length; i++) {
                this._secondDic[i].fuc.apply(this._secondDic[i].evtTag);
            }
        }
        for (var i = 0; i < this._hanlderDic.length; i++) {
            this._hanlderDic[i].fuc.apply(this._hanlderDic[i].evtTag);
        }
    }
    public addFun(fuc: Function, evtTag: any): void {
        for (var i = 0; i < this._hanlderDic.length; i++) {
            if (this._hanlderDic[i].evtTag == evtTag) {
                return;
            }
        }
        this._hanlderDic.push({ fuc: fuc, evtTag: evtTag });
    }
    public removeFun(fuc: Function, evtTag: any): void {
        for (var i = this._hanlderDic.length - 1; i >= 0; i--) {
            if (this._hanlderDic[i].evtTag == evtTag) {
                this._hanlderDic.splice(i, 1);
                return;
            }
        }
    }

    public addSecondFun(fuc: Function, evtTag: any): void {
        for (var i = 0; i < this._secondDic.length; i++) {
            if (this._secondDic[i].evtTag == evtTag) {
                return;
            }
        }
        this._secondDic.push({ fuc: fuc, evtTag: evtTag });
    }
    public removeSecondFun(fuc: Function, evtTag: any): void {
        for (var i = this._secondDic.length - 1; i >= 0; i--) {
            if (this._secondDic[i].evtTag == evtTag) {
                this._secondDic.splice(i, 1);
                return;
            }
        }
    }


    public pause(): void {
        /**  if(this._timer){
             this._timer.stop();
         }*/
        this._layerStage.removeEventListener(egret.Event.ENTER_FRAME, this._timerRun, this)
    }
    public restart(): void {
        /*
        if(this._timer&&!this._timer.running){
            this._timer.start();
        }*/
        this._layerStage.addEventListener(egret.Event.ENTER_FRAME, this._timerRun, this)
    }
}
