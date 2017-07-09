module load {
    /**
     * RESLoad
     */
    export class RESLoad {
        public constructor() {
        }
        private _currentRES: any;//当前加载的资源
        private _params: string[];//要加载的资源组
        private _view: IUILoad;//传入的加载样式
        private _func: Function;
        private _thisObject: any;
        private _obj: any;
        private _resLeng: number;//需要加载资源的总长度

        /**
         * params:加载的资源数组名
         * func:回调
         * evtTag:调用者
         * view:加载资源的样式
         */
        public load(params: string[], func: Function, evtTag: any, view: IUILoad, obj: any) {
            this._params = params;
            this._view = view;
            this._func = func;
            this._thisObject = evtTag;
            this._obj = obj;
            this._resLeng = this._params.length;
            this._addEvent();
            this._startLoad();
        }
        /**
         * 开始加载
         */
        private _startLoad() {
            if (this._params.length == 0) {
                this._loadContentComplete();
                return;
            }
            this._currentRES = this._params.shift();
            RES.loadGroup(this._currentRES);
        }
        /**
         * 添加事件
         */
        private _addEvent() {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this._onItemLoadError, this);
        }
        /**
         * 移除事件
         */
        private _removeEvent() {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this._onItemLoadError, this);
        }
        /**
         * 资源组加载出错
         */
        private _onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }
        /**
         * 资源组加载出错
         */
        private _onResourceLoadError(event: RES.ResourceEvent): void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            this._onResourceLoadComplete(event);
        }
        /**
         * preload资源组加载进度
         */
        private _onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == this._currentRES) {
                //console.log("progress");
                var progressNum = event.itemsLoaded;
                var totalNum = event.itemsTotal;
                this._view.currentProgress(progressNum, totalNum);
                this._onTotalProgress(progressNum, totalNum);
            }
        }
        /**
         * 加载资源的总进度
         */
        private _onTotalProgress(progressNum: number, totalNum: number) {
            // this._resLeng
            // this._params.length;
            var sectionT: number = 100 / this._resLeng;
            var alreadyLeng: number = this._resLeng - this._params.length - 1;
            var progressNumT: number = alreadyLeng * sectionT + (progressNum / totalNum) * sectionT;
            this._view.totalProgress(progressNumT, 100);
        }
        /**
         * preload资源组加载完成
         */
        private _onResourceLoadComplete(event: RES.ResourceEvent): void {
            if (event.groupName == this._currentRES) {
                if (this._params.length > 0) {
                    this._startLoad();
                } else {
                    this._loadContentComplete();
                }
            }
        }
        /**
         * 全部加载完成
         */
        private _loadContentComplete() {
            this._removeEvent();
            if (this._view) {
                this._view.currentComplete(this._obj);
                this._view = null;
            }
            if (this._func && this._thisObject && this._obj) {
                this._func.apply(this._thisObject, [this._obj]);
            } else if (this._func && this._thisObject) {
                this._func.apply(this._thisObject);
            }

            this._currentRES = null;
            this._params = null;
            this._view = null;
            this._func = null;
            this._thisObject = null;
            this._obj = null;
            this._resLeng = null;

        }
    }
}