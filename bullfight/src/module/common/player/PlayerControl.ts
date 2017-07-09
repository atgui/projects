module player {
	export class PlayerControl {
		public constructor() {
		}

		private static _instance: PlayerControl;
		public static get instance(): PlayerControl {
			this._instance = this._instance || new PlayerControl;
			return this._instance
		}

		public mySelf: PlayerModel
		public start() {
			this.mySelf = new player.PlayerModel();
		}

		public updataAllPlayer(data) {
			var changedArr: Array<any> = data.changedVars;
			var user = data.user;
			user.isItMe;
			user.id;
			user.name;
			user.privilegeId;
			user.variables;
			if (user.isItMe == true) {
				this._upData(this.mySelf, data);
			}
		}

		private _upData(playerModel: player.PlayerModel, data) {
			var user = data.user.variables;
			playerModel.id = user.id.value;
			playerModel.username = user.username.value;
			playerModel.email = user.email.value;
			playerModel.nickname = user.nickname.value;
			playerModel.experience = user.experience.value;
			playerModel.portrait = user.portrait.value;
			playerModel.goldcoins = user.goldcoins.value;
			playerModel.diamond = user.goldbars.value;
			playerModel.charm = user.charm.value;
			playerModel.regtime = user.regtime.value;
			playerModel.vip = user.vip.value;
			playerModel.signature = user.signature.value;
			playerModel.dispatchEvent(new GameEvent(GameEvent.CHANGE));
		}

		/**
		 * 请求获取玩家信息数据
		 */
		public send_receive_email(id: string) {
			var obj: any = {};
			obj[common.ServerKey.USER_NAME] = id;//邮件ID号
			SFSManager.instance.sendExtension(PlayerCMD.GET_USERINFO, obj);
		}


		//==================服务器返回========================

		/**
		 * 获得玩家数据
		 */
		public player_userInfo(data) {
			var data = data[common.ServerKey.DATA];
			this.mySelf.dispatchEvent(new GameEvent(PlayerCMD.GET_USERINFO, data));
		}

	}
}