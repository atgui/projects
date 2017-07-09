class StartGame {
        public constructor() {
        }
        public start(bsSpr) {
                LayerManager.instance.baseContainer = bsSpr;
                AdaptiveManager.instance.start();
                SceneManager.instance.addScene("loading", new BigLoadingScene);
                SceneManager.instance.addScene("login", new LoginScene);
                SceneManager.instance.addScene("hall", new HallScene);
                SceneManager.instance.addScene("wanRenDouNiu", new WanRenDouNiuScene);

                //        SocketManager.instance.addEventListener(GameEvent.SOCKET_CONNECTED,this._socketConnected,this);
                //        SocketManager.instance.start("172.1.1.140",9001);
                TimeManager.instance.start(15);
                PromptManager.instance.start();
                LoadManager.instance.start();                
                // SoundManager.instance.start();
                //GameManger.instance.start();
                //ConfigManager.instance.start();
                //ServerManager.instance.start();
                //MoniServerManager.instance.start();

                // MoniServerManager.instance.start();

                DeviceManager.instance.start();
                PopupManager.instance.start();
                this._initControls();

                new load.InitLoading();
                LayerManager.instance.stage.addEventListener(egret.Event.RESIZE, this._resizeStage, this);
        }
        private _resizeStage(e: egret.Event) {
                this._setLayerHeight();
        }
        private _setLayerHeight() {
                // var defW: number = LayerManager.instance.stageWidth;
                // var defH: number = LayerManager.instance.stageHeight;
                // var screenW = window.innerWidth;
                // var screenH = window.innerHeight;
                // var dSW: number = defW / screenW;
                // LayerManager.instance.stageHeight = screenH * dSW;
        }


        /**
         * 初始化所有control
         */
        private _initControls() {
                login.LoginControl.instance.start();
                hall.HallControl.instance.start();
                wanRenDouNiu.BullControl.instance.start();
                player.PlayerControl.instance.start();
                chat.ChatControl.instance.start();
                common.CommonControl.instance.start();
        }

        /**
         * sfs连接成功
         */
        private _sfsConnect(e: GameEvent) {

        }



}