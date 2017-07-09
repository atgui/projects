
interface IUILoad {
    setCmd(cmd):void;
    currentProgress(progressNum:number,totalNum:number):void;
    totalProgress(progressNum:number,totalNum:number):void;
    currentComplete(obj:any):void;
}