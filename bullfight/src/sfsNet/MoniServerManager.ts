class MoniServerManager {
	public constructor() {
	}
	private static _instance: MoniServerManager;
	public static get instance(): MoniServerManager {
		this._instance = this._instance || new MoniServerManager();
		return this._instance;
	}

	// private _socket: egret.WebSocket;
	// public get socket(): egret.WebSocket {
	// 	return this._socket;
	// }
	// public set socket(value: egret.WebSocket) {
	// 	this._socket = value;
	// }
	// private _socketAnalysis: sfsNet.SFSAnalysis;
	// private _chat_url: string;
	// public start(): void {
	// 	this._socketAnalysis = new sfsNet.SFSAnalysis();

	// 	this._socket = new egret.WebSocket();
	// 	this._socket.type = egret.WebSocket.TYPE_STRING;
	// 	this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this._onReceiveMessage, this);
	// 	this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this._onIoErr, this);
	// 	this._socket.addEventListener(egret.Event.CLOSE, this._onIoErr, this);
	// 	// this._socket.addEventListener(egret.Event.CONNECT, this._onSocketOpen, this);
	// }
	// //连接
	// public connect(chat_url: string): void {
	// 	this._chat_url = chat_url;
	// 	if (this._socket.connected) {
	// 		this._socket.close();
	// 	}
	// 	this._socket.connectByUrl(chat_url);
	// }
	// private _onSocketOpen(e: egret.Event): void {
	// 	console.log("socket连接成功");
	// 	this._socketAnalysis.excute(net.SFSCmd.CMD_CONNECT_SUCCESS);
	// }

	// private _onIoErr(e: any): void {
	// 	console.log("socket的io错误");
	// }
	// //得到信息
	// private _onReceiveMessage(e: egret.Event): void {
	// 	try {
	// 		var data: string = e.currentTarget.readUTF();
	// 		// var str = decodeURIComponent(data);
	// 		var msgData: MsgData = JSON.parse(data);
	// 		this._socketAnalysis.excute(msgData.cmd, msgData);
	// 	} catch (err) {
	// 		console.log("chat没有数据了" + err.message);
	// 	}
	// }
	// //发送信息
	// public send(msgData: MsgData): void {
	// 	var info = JSON.stringify(msgData);
	// 	this._socket.writeUTF(info);
	// 	this._socket.flush();
	// }


	private _playerModel: player.PlayerModel;

	private _cards: Array<wanRenDouNiu.CardModel>;


	public start() {
		this._cards = new Array<wanRenDouNiu.CardModel>();

		this._playerModel = new player.PlayerModel();
		this._playerModel.charm = "900";
		this._playerModel.username = "default_x";
		this._playerModel.id = "0x99999";
		this._playerModel.diamond = "9999999";
		this._playerModel.goldcoins = "999999";
		this._playerModel.sex = "男";
		this._playerModel.signature = "sssbbb";
		this._playerModel.regtime = new Date().toDateString();
		this._playerModel.portrait = "/xx.jpg";
		this._playerModel.password = "123456";
		this._playerModel.experience = 1999900;
	}

	public startBet(ix: number) {
		wanRenDouNiu.BullControl.instance.bull_start_bet(ix);
	}

	public login() {
		player.PlayerControl.instance.updataAllPlayer({ user: this._playerModel });
	}

	public fp() {
		
	}

}