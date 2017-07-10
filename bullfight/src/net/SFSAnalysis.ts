module net {
	export class SFSAnalysis implements IExcute {
		public constructor() {
		}

		public excute(cmd: string, ...obj) {
			switch (cmd) {
				case net.SFSCmd.CMD_CONNECT_SUCCESS:
					login.LoginControl.instance.loginModel.connectSuccess = true;
					break;
				case net.SFSCmd.CMD_LOGIN_SUCCESS:
					login.LoginControl.instance.loginModel.loginSuccess = true;
					break;
				case net.SFSCmd.CMD_JOINROOM_SUCCESS:
					this._joinRoomSuccess(obj[0]);
					break;
				case net.SFSCmd.CMD_EXTENSION_DATA:
					this._analysisExtension(obj[0]);
					break;
				case net.SFSCmd.CMD_PLAYER_UPDATA:
					player.PlayerControl.instance.updataAllPlayer(obj[0]);
					break;
			}
		}


		//加入房间成功
		private _joinRoomSuccess(evtParams) {
			var room = evtParams.room;
			login.LoginControl.instance.joinRoomSuccess();
			// switch (room.name) {
			// 	case "Hall":
			// 		login.LoginControl.instance.loginModel.joinHall();
			// 		break;
			// }
		}

		//获得游戏中自定义协议
		private _analysisExtension(evtParams) {
			var cmd: String = evtParams.cmd;
			var data: any = evtParams.params;
			// console.log(evtParams);
			switch (cmd) {
				//信息提示
				case wanRenDouNiu.BullCMD.TASK_MSG:
					common.CommonControl.instance.showServerMsg(data);
					break;
				//弹出框
				case wanRenDouNiu.BullCMD.SERVER_ALERT:
					common.CommonControl.instance.showServerAlert(data);
					break;
				//牛牛上庄
				case wanRenDouNiu.BullCMD.BULL_UP_MASTER:
					wanRenDouNiu.BullControl.instance.bull_up_master(data);
					break;
				//牛牛发牌
				case wanRenDouNiu.BullCMD.BULL_DOING:
					wanRenDouNiu.BullControl.instance.bull_doing(data);
					break;
				//牛牛时间
				case wanRenDouNiu.BullCMD.BULL_TIMER:
					wanRenDouNiu.BullControl.instance.bull_timer(data);
					break;
				//进入牛牛
				case wanRenDouNiu.BullCMD.JOIN_BULL:
					wanRenDouNiu.BullControl.instance.bull_join_bull(data);
					break;
				//退出牛牛
				case wanRenDouNiu.BullCMD.EXIT_BULL:
					wanRenDouNiu.BullControl.instance.bull_exit_bull();
					break;
				//牛牛开始下注
				case wanRenDouNiu.BullCMD.BULL_START_BET:
					wanRenDouNiu.BullControl.instance.bull_start_bet();
					break;
				//牛牛停止下注
				case wanRenDouNiu.BullCMD.BULL_STOP_BET:
					wanRenDouNiu.BullControl.instance.bull_stop_bet();
					break;
				//牛牛下注
				case wanRenDouNiu.BullCMD.BULL_DOWNBET:
					wanRenDouNiu.BullControl.instance.bull_downbet(data);
					break;
				//牛牛结果
				case wanRenDouNiu.BullCMD.BULL_RESULT:
					wanRenDouNiu.BullControl.instance.bull_result(data);
					break;
				//牛牛在线
				case wanRenDouNiu.BullCMD.BULL_ONLINE:
					wanRenDouNiu.BullControl.instance.bull_online(data);
					break;
				//牛牛清除下注
				case wanRenDouNiu.BullCMD.BULL_CLEAR:
					break;
				//牛牛路单
				case wanRenDouNiu.BullCMD.BULL_HISTORY:
					wanRenDouNiu.BullControl.instance.bull_history(data);
					break;
				//牛牛帮助
				case wanRenDouNiu.BullCMD.BULL_HELP:
					break;
				//牛牛全下注
				case wanRenDouNiu.BullCMD.BULL_ALL_DOWNBET:
					wanRenDouNiu.BullControl.instance.bull_all_downbet(data);
					break;
				//牛牛上庄列表
				case wanRenDouNiu.BullCMD.BULL_MASTER_LIST:
					console.log("上庄列表");
					wanRenDouNiu.BullControl.instance.bull_master_list(data);
					break;
				//牛牛上坐
				case wanRenDouNiu.BullCMD.BULL_SEAT:
					wanRenDouNiu.BullControl.instance.bull_seat_info(data);
					break;
				//玩家列表
				case wanRenDouNiu.BullCMD.ONLINE:
					wanRenDouNiu.BullControl.instance.bull_roomOnline(data);
					break;
				//请求获得主页公告信息
				case hall.HallCMD.ANNOUNCEMENT:
					hall.HallControl.instance.hall_announcement(data);
					break;
				//请求获得排行数据
				case hall.HallCMD.RANKING:
					hall.HallControl.instance.hall_ranking(data);
					break;
				//请求获得商城数据
				case hall.HallCMD.SHOPING:
					hall.HallControl.instance.hall_shoping(data);
					break;
				//请求获得钻石购买
				// case hall.HallCMD.BUY_GOLDBARS:
				// 	hall.HallControl.instance.hall_shoping_buy_goldbrs(data);
				// 	break;
				//请求获得筹码购买
				// case hall.HallCMD.BUY_GOLDCONIS:
				// 	hall.HallControl.instance.hall_shoping_buy_goldcoins(data);
				// 	break;
				//请求获得转盘转奖数据
				// case hall.HallCMD.ROTARY_PRIZE:
				// 	hall.HallControl.instance.hall_rotary_prize(data);
				// 	break;
				//请求获得邮件列表数据
				case hall.HallCMD.EMAIL_LIST:
					hall.HallControl.instance.hall_email_List(data);
					break;
				//请求获得主播列表数据
				// case hall.HallCMD.LIVE_LIST:
				// 	hall.HallControl.instance.hall_anchorlist(data);
					// break;
				//请求获得聊天信息内容
				case chat.ChatCMD.PUBLIC_MSG:
					chat.ChatControl.instance.chat_public_msg(data);
					break;
				//请求获取礼物列表数据
				case chat.ChatCMD.GIFT_LIST:
					chat.ChatControl.instance.chat_gift_list(data);
					break;
				//请求赠送玩家礼物
				case chat.ChatCMD.GIVE_GIFT:
					chat.ChatControl.instance.chat_give_gift(data);
					break;
				//获取玩家信息
				case player.PlayerCMD.GET_USERINFO:
					player.PlayerControl.instance.player_userInfo(data);
					break;
				//VIP奖励配置列表
				// case common.CommonCMD.VIP_LIST:
				// 	common.CommonControl.instance.common_VipList(data);
				// 	break;
				// //请求领取VIP在线奖励
				// case common.CommonCMD.RECEIVE_VIP:
				// 	common.CommonControl.instance.common_ReveiceVip(data);
				// 	break;
				// //请求获取VIP奖励配置列表
				// case common.CommonCMD.VIP_TIME:
				// 	common.CommonControl.instance.common_VipTime(data);
				// 	break;
				//修改玩家信息
				case common.CommonCMD.MODIFY:
					common.CommonControl.instance.common_Modify(data);
					break;

			}
		}

		public netErr(str: string) {
			common.CommonControl.instance.netBreak(str);
		}

		/**
		 * 系统喇叭
		 */
		public trumpet(str: string) {
			common.CommonControl.instance.trumpet(str);
		}
	}
}