class SFSManager {
	public constructor() {

	}

	private static _instance: SFSManager;
	public static get instance(): SFSManager {
		this._instance = this._instance || new SFSManager;
		return this._instance;
	}

	private _sfs: any;
	private _analysis: net.SFSAnalysis;
	public SFS2X = window["SFS2X"];

	public start(url: string, post: number) {

		// Create SmartFox client instance
		this._sfs = new this.SFS2X.SmartFox();
		this._analysis = new net.SFSAnalysis();
		// Add event listeners
		this._sfs.addEventListener(this.SFS2X.SFSEvent.CONNECTION, this._onConnection, this);

		this._sfs.addEventListener(this.SFS2X.SFSEvent.LOGIN, this._onLogin, this);
		this._sfs.addEventListener(this.SFS2X.SFSEvent.LOGIN_ERROR, this._onLoginError, this);

		this._sfs.addEventListener(this.SFS2X.SFSEvent.ROOM_JOIN, this._onRoomJoined, this);
		this._sfs.addEventListener(this.SFS2X.SFSEvent.ROOM_JOIN_ERROR, this._onRoomJoinError, this);


		this._sfs.addEventListener(this.SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse, this)

		this._sfs.addEventListener(this.SFS2X.SFSEvent.USER_VARIABLES_UPDATE, this._userVarUpdata, this)
		this._sfs.addEventListener(this.SFS2X.SFSEvent.CONNECTION_LOST, this._onConnectionLost, this)

		this._sfs.addEventListener(this.SFS2X.SFSEvent.ADMIN_MESSAGE, this._onAdminMessage, this);
		this._sfs.connect(url, post);
	}


	public get isConnect(): boolean {
		return true;//this._sfs.isConnected();
	}
	//==================================发出===========================================
	/**
	 * 登录
	 */
	public sendLogin(userName: string, passWord: string, obj: any, zoomName: string) {
		//userName, passWord, obj, zoomName
		this._sfs.send(new this.SFS2X.Requests.System.LoginRequest(userName, passWord, obj, zoomName));
	}

	/**
	 * 进入房间
	 */
	public sendJoinRoom(zoomName: string) {
		this._sfs.send(new this.SFS2X.Requests.System.JoinRoomRequest(zoomName));
	}

	/**
	 * 发送扩展信息
	 */
	public sendExtension(cmd: string, data: any) {
		this._sfs.send(new this.SFS2X.Requests.System.ExtensionRequest(cmd, data));
	}

	//===================================返回======================================


	/**
	 * 链接返回
	 */

	private _onConnection(event) {
		// Reset view

		if (event.success) {
			console.log("Connected to SmartFoxServer 2X!");
			this._analysis.excute(net.SFSCmd.CMD_CONNECT_SUCCESS);
		}
		else {
			var error = "Connection failed: " + (event.errorMessage ? event.errorMessage + " (code " + event.errorCode + ")" : "Is the server running at all?");
			console.log(error);
		}

	}



	/**
	 * 登录成功
	 */
	private _onLogin(evtParams) {
		console.log("Login successful!---" + evtParams.user.privilegeId);
		if (evtParams.user.privilegeId == this.SFS2X.Entities.UserPrivileges.GUEST) {
			var params: any = {};
			params.username = "kelis3";
			params.password = "12345678";
			params.email = "111@qq.com";
			params.age = 26;
			params.country = "zh";
			//this._sfs.send(new this.SFS2X.Requests.System.ExtensionRequest(net.SFSCmd.CMD_SUBMIT, params));
		} else if (evtParams.user.privilegeId == this.SFS2X.Entities.UserPrivileges.STANDARD) {
			console.log("登录成功");
			this._analysis.excute(net.SFSCmd.CMD_LOGIN_SUCCESS)
		}
	}

	/**
	 * 登录失败
	 */
	private _onLoginError(evtParams) {
		console.log("Login failure: " + evtParams.errorMessage);
	}


	/**
	 * 加入房间成功
	 */
	private _onRoomJoined(evtParams) {
		console.log("进入房间成功: " + evtParams.room.name);
		this._analysis.excute(net.SFSCmd.CMD_JOINROOM_SUCCESS, evtParams);
	}
	/**
	 * 加入房间失败
	 */
	private _onRoomJoinError(evtParams) {
		console.log("Room joining failed: " + evtParams.errorMessage);
	}


	/**
	 * 得到自定义数据
	 */
	private _onExtensionResponse(evt): void {
		var cmd: String = evt.cmd;
		var sfso: any = evt.params;
		if (cmd !== "4") {
			// console.log("得到数据" + cmd + "==========(4屏蔽)");
		}
		this._analysis.excute(net.SFSCmd.CMD_EXTENSION_DATA, evt);

	}


	/**
	 * 玩家用户数据变更
	 */
	private _userVarUpdata(evt): void {
		var cmd: String = evt.cmd;
		var sfso: any = evt.params;
		console.log("得到玩家数据" + sfso);
		this._analysis.excute(net.SFSCmd.CMD_PLAYER_UPDATA, evt);
	}


	/**
	 * 断线处理
	 */
	private _onConnectionLost(evtParams) {
		var reason = evtParams.reason;
		var str: string;
		if (reason != this.SFS2X.Utils.ClientDisconnectionReason.MANUAL) {
			if (reason == this.SFS2X.Utils.ClientDisconnectionReason.IDLE) {
				str = "由于你长期未操作，已与服务器断开连接。";//闲置
			} else if (reason == this.SFS2X.Utils.ClientDisconnectionReason.KICK) {
				str = "与服务器断开连接，请检查网络。";//被踢
			} else if (reason == this.SFS2X.Utils.ClientDisconnectionReason.BAN) {
				str = "你已被封号。";//封号
			} else {
				str = "未知原因与服务器断开连接。";//其他
			}
		}
		else {
			str = "与服务器断开连接。";
		}
		this._analysis.netErr(str);
	}


	/**
	 * 系统喇叭
	 */
	private _onAdminMessage(evtParams) {
		var str: string = evtParams.message;
		this._analysis.trumpet(str);
	}


	/**
	 * 获得组房间列表
	 */
	public getRoomListFromGroup(name: string): Array<any> {
		var list = this._sfs.roomManager.getRoomListFromGroup(name);
		return list;
	}
}