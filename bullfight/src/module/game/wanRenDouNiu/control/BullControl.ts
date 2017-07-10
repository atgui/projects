module wanRenDouNiu {
	export class BullControl {
		public constructor() {
		}
		private static _instance: wanRenDouNiu.BullControl;
		public static get instance(): wanRenDouNiu.BullControl {
			this._instance = this._instance || new wanRenDouNiu.BullControl;
			return this._instance
		}
		public BullModel: wanRenDouNiu.BullModel;
		public seatInfoArr: Array<string>;//座位信息集合
		public bimod: common.BankerInfoModel;

		public cacheArr: Array<any>;

		public start() {
			//自定义文字信息
			var wzStr = egret.localStorage.getItem("wz_cache");
			if (wzStr) {
				this.cacheArr = JSON.parse(wzStr);
			} else {
				this.cacheArr = [];
			}

			this.BullModel = new wanRenDouNiu.BullModel();
			this.seatInfoArr = new Array<string>();
			this.bimod = new common.BankerInfoModel();
		}


		public videoErr(msg) {
			if (msg.type == "error") {
				var str = "";
				switch (msg.detail.code) {
					case 1:
						str = "网络错误，请检查网络配置或者播放链接是否正确"
						break;
					case 2:
						str = "视频解码错误"
						break;
					case 3:
						str = "网络错误，请检查网络配置或者播放链接是否正确"
						break;
					case 4:
						str = "获取视频失败，请检查播放链接是否有效"
						break;
					case 5:
						str = "当前系统环境不支持播放该视频格式"
						break;
					case 1001:
						str = "网络错误，请检查网络配置或者播放链接是否正确"
						break;
					case 1002:
						str = "获取视频失败，请检查播放链接是否有效"
						break;
					case 2032:
						str = "获取视频失败，请检查播放链接是否有效"
						break;
					case 2048:
						str = "无法加载视频文件，跨域访问被拒绝"
						break;
				}
				common.CommonControl.instance.showVideoAlert(str);
				this.BullModel.dispatchEvent(new GameEvent(BullCMD.NOT_HAVE_VIDEO));
				// this.remove();
			} else if (msg.type == "timeupdate") {
				this.BullModel.dispatchEvent(new GameEvent(BullCMD.VIDEO_TIMEUPDATA));
			} else {
				// load  resize   play  playing
				var boo = window["videoControl"].isPlaying();
				console.log("video=============" + msg.type + "===========" + boo);
			}

		}



		//===========================发给服务器===============================
		/**
		 * 请求退出斗牛游戏
		 */
		public send_exit_bull() {
			SFSManager.instance.sendExtension(BullCMD.EXIT_BULL, {});
		}

		/**
		 * 请求下注  key=  1234 分别对应  桃红梅方    value 下注的数值
		 */
		public send_bull_downbet(key: string, value: number) {
			var obj: any = {};
			obj[common.ServerKey.KEY] = key;
			obj[common.ServerKey.VALUE] = value;
			SFSManager.instance.sendExtension(BullCMD.BULL_DOWNBET, obj);
		}

		/**
		 * 请求查看上庄列表
		 */
		public send_bull_master_list() {
			SFSManager.instance.sendExtension(BullCMD.BULL_MASTER_LIST, {});
		}
		/**
		 * 请求上庄
		 */
		public send_bull_up_master() {
			SFSManager.instance.sendExtension(BullCMD.BULL_UP_MASTER, {});
		}

		//座位对应的key
		private _SEAT_ID_LIST: Array<string> = ["seat1", "seat2", "seat3", "seat4", "seat5", "seat6", "seat7", "seat8"]
		/**
		 * 请求上座贵宾席
		 */
		public send_bull_seat(setId: number) {
			var obj: any = {};
			var seatKey: string = this._SEAT_ID_LIST[setId]
			obj[common.ServerKey.SEAT_NAME] = seatKey;
			SFSManager.instance.sendExtension(BullCMD.BULL_SEAT, obj);
		}
		/**
		 * 显示礼物框
		 */
		public setEventInfo(val: string) {
			this.BullModel.dispatchEvent(new GameEvent(val));
		}
		/**
		 * 请求获得房间在线玩家列表
		 */
		public setRoomUserList() {
			var obj: any = {};
			SFSManager.instance.sendExtension(BullCMD.ONLINE, obj);
		}

		//========================服务器返回========================

		/**
		 * 加入牛牛
		 */
		public bull_join_bull(data) {
			this.BullModel.myBetList = data[common.ServerKey.DATA];
			this.BullModel.myBetTotalScore = data[common.ServerKey.BUY];
			this.BullModel.myBetTopScore = data[common.ServerKey.BET];
			this.BullModel.gameMsters = data[common.ServerKey.MSTERS];
			this.bimod.bankerName = this.BullModel.gameMsters["3"];
			this.bimod.ident = this.BullModel.gameMsters["4"];
			this.bimod.bankerGold = this.BullModel.gameMsters["5"];
			hall.HallControl.instance.hallModel.joinGameName = "wanRenDouNiu";
		}
		/**
		 * 退出牛牛
		 */
		public bull_exit_bull() {
			SceneManager.instance.show("hall");
		}

		/**
		 * 路单  0 是最老的   尾部是最新的
		 */
		public bull_history(data) {
			var arr: Array<any> = data[common.ServerKey.DATA];
			this.BullModel.histroyArr = arr.reverse();
		}

		/**
		 * 在线及桌面数据推送
		 */
		public bull_online(data) {
			this.BullModel.gameBetTotal = data[common.ServerKey.GOLDCOINS];
			this.BullModel.gameBuyCount = data[common.ServerKey.BUY_COUNT];
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_ONLINE));
		}
		/**
		 * 斗牛发牌推送
		 */
		public bull_doing(data) {
			this.BullModel.canBet = false;
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_DOING));
		}
		/**
		 * 开始下注推送
		 */
		public bull_start_bet(ix?: number) {
			this.BullModel.canBet = true;
			// console.log("开始下注");
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_START_BET, ix));
		}
		/**
		 * 斗牛押注剩余时间推送
		 */
		public bull_timer(data) {
			this.BullModel.canBet = true;
			var time: number = data[common.ServerKey.TIME];
			//console.log(time);
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_TIMER, time));
		}
		/**
		 * 牛牛停止下注
		 */
		public bull_stop_bet() {
			this.BullModel.canBet = false;
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_STOP_BET));
		}

		/**
		 * 请求下注
		 */
		public bull_downbet(data) {
			this.BullModel.gameBetTotal = data[common.ServerKey.GOLDCOINS];
			this.BullModel.gameBuyCount = data[common.ServerKey.BUY_COUNT];
			var obj: common.BullServer_BetDownModel = new common.BullServer_BetDownModel()
			obj.nowBetName = data[common.ServerKey.USER_NAME];
			obj.gameBetTotal = data[common.ServerKey.GOLDCOINS];
			obj.gameBuyCount = data[common.ServerKey.BUY_COUNT];
			obj.nowBetKey = data[common.ServerKey.KEY];
			obj.nowBetNum = data[common.ServerKey.VALUE];
			obj.areaObj = data[common.ServerKey.BET];
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_DOWNBET, obj));
		}


		/**
		 * 牛牛开奖结果推送
		 */
		public bull_result(data) {
			var obj: common.BullServer_Result = new common.BullServer_Result();
			obj.masterWin = data[common.ServerKey.MSG];//个人已结算金币值
			obj.resultData = data[common.ServerKey.DATA];//开奖结果数据
			obj.resultTime = data[common.ServerKey.TIME];//开奖结果展示倒计时
			obj.resultList = data[common.ServerKey.RESULT_LIST];//个人中奖结果列表
			obj.winList = data[common.ServerKey.WIN_LIST];//中奖排行列表
			obj.myWinScore = data[common.ServerKey.WIN_BET];//中奖共计金币
			obj.areaBetInfo = data[common.ServerKey.BET];//每个区域的总下注值数据
			obj.myScore = data[common.ServerKey.GOLDCOINS];//个人已结算金币值
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_RESULT, obj));

		}

		/**
		 * 牛牛下注总金币实时推送
		 */
		public bull_all_downbet(data) {
			var obj: common.BullServer_bull_all_downbet = new common.BullServer_bull_all_downbet();
			obj.betList = data[common.ServerKey.DATA];//下注数据列表
			obj.gameBuyCount = data[common.ServerKey.BUY_COUNT];//斗牛桌面总下注手数
			obj.areaObj = data[common.ServerKey.BET];//1234对应4个  每个区域的总下注值数据
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_ALL_DOWNBET, obj));
		}

		/**
		 * 上庄列表
		 */
		public bull_master_list(data) {
			var obj: common.BullServer_bull_master_list = new common.BullServer_bull_master_list();
			this.BullModel.mstersList = data[common.ServerKey.MSTERS];//上庄用户的账户
			this.BullModel.minNeedScore = data[common.ServerKey.BET];//上庄要求的最低金币数
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_MASTER_LIST));
		}

		/**
		 * 上庄信息
		 */
		public bull_up_master(data) {
			this.BullModel.gameMsters = data[common.ServerKey.MSTERS];
			this.bimod.bankerName = this.BullModel.gameMsters["3"];
			this.bimod.ident = this.BullModel.gameMsters["4"];
			this.bimod.bankerGold = this.BullModel.gameMsters["5"];
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_UP_MASTER));
		}

		/**
		 * 座位信息
		 */
		public bull_seat_info(data) {
			var obj: common.BullServer_BULL_SEAT = new common.BullServer_BULL_SEAT();
			var seatObj = data[common.ServerKey.SEAT_NAME];
			var seatInfoArr: Array<string> = new Array<string>();
			for (var i: number = 0; i < this._SEAT_ID_LIST.length; i++) {
				if (seatObj.hasOwnProperty(this._SEAT_ID_LIST[i]) == true) {
					seatInfoArr[i] = seatObj[this._SEAT_ID_LIST[i]];
				} else {
					seatInfoArr[i] = null;
				}
			}
			obj.seatInfo = seatInfoArr;//所有坐位信息
			obj.isInSeat = data[common.ServerKey.VALUE];//是否上坐成功
			this.seatInfoArr = seatInfoArr;
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.BULL_SEAT, obj));
		}

		/**
		 * 房间玩家列表
		 */
		public bull_roomOnline(data) {
			var list = data[common.ServerKey.DATA];
			this.BullModel.dispatchEvent(new GameEvent(BullCMD.ONLINE, list));
		}
	}
}