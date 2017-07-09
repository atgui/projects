module sfsNet {
	export class SFSAnalysis implements IExcute {
		public constructor() {
		}

		public excute(cmd: string, ...obj) {
			var data: Array<MsgData> = obj;
			switch (cmd) {
				case net.SFSCmd.CMD_CONNECT_SUCCESS:
					console.log("连接成功");
					break;
				case net.SFSCmd.CMD_LOGIN_SUCCESS:
					// new load.InitLoading();
					console.log(obj);
					player.PlayerControl.instance.updataAllPlayer(obj[0].params);
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
			switch (room.name) {
				case "Hall":
					//login.LoginControl.instance.loginModel.joinHall();
					break;
			}
		}

		//获得游戏中自定义协议
		private _analysisExtension(evtParams) {
			var cmd: String = evtParams.cmd;
			var data: any = evtParams.params;
			switch (cmd) {
				// case game.GameCMD.get_intoRoom:
				// 	game.GameControl.instance.gameModel.get_intoRoom(data);
				// 	break;
				// case game.GameCMD.get_allReady:
				// 	game.GameControl.instance.gameModel.get_allReady(data);
				// 	break;
				// case game.GameCMD.get_allDeal:
				// 	game.GameControl.instance.gameModel.get_allDeal(data);
				// 	break;
				// case game.GameCMD.get_allHogBanker:
				// 	game.GameControl.instance.gameModel.get_allHogBanker(data);
				// 	break;
				// case game.GameCMD.get_allSelectOdds:
				// 	game.GameControl.instance.gameModel.get_allSeleteOdds(data);
				// 	break;
				// case game.GameCMD.get_allReplenishCard:
				// 	game.GameControl.instance.gameModel.get_allReplenishCard(data);
				// 	break;
				// case game.GameCMD.get_allShowCard:
				// 	game.GameControl.instance.gameModel.get_allShowCard(data);
				// 	break;
			}
		}

		public netErr(str: string) {
			// common.CommonControl.instance.netBreak(str);
		}

		// /**
		//  * 系统喇叭
		//  */
		public trumpet(str: string) {
			// common.CommonControl.instance.trumpet(str);
		}
	}
}