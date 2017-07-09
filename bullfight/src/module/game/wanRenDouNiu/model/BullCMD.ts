module wanRenDouNiu {
	export class BullCMD {
		public constructor() {
		}


		//信息提示
		public static TASK_MSG = "0";
		//弹出框
		public static SERVER_ALERT = "1";
		//牛牛上庄
		public static BULL_UP_MASTER = "2";
		//牛牛发牌
		public static BULL_DOING = "3";
		//牛牛时间
		public static BULL_TIMER = "4";
		//进入牛牛
		public static JOIN_BULL = "5";
		//退出牛牛
		public static EXIT_BULL = "6";
		//牛牛开始下注
		public static BULL_START_BET = "7";
		//牛牛停止下注
		public static BULL_STOP_BET = "8";
		//牛牛下注
		public static BULL_DOWNBET = "9";
		//牛牛结果
		public static BULL_RESULT = "10";
		//牛牛在线
		public static BULL_ONLINE = "11";
		//牛牛清除下注
		public static BULL_CLEAR = "12";
		//牛牛路单
		public static BULL_HISTORY = "13";
		//牛牛帮助
		public static BULL_HELP = "14";
		//牛牛全下注
		public static BULL_ALL_DOWNBET = "15";
		//牛牛上庄列表
		public static BULL_MASTER_LIST = "16";
		//牛牛上坐
		public static BULL_SEAT = "17";
		//牛牛抢坐
		public static BULL_SQUEEZE = "18";
		//房间玩家信息
		public static ONLINE = "38";

		/**
		 * 没有视频
		 */
		public static NOT_HAVE_VIDEO = "not_have_video";
		/**
		 * 视频正在播放
		 */
		public static VIDEO_TIMEUPDATA = "video_timeupdate";

	}
}