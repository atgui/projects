/**
 *
 * @author 
 *
 */
class SocketManager extends GameDispatcher{
	public constructor() {
        super();
	}
	
    private static _instance: SocketManager;
    public static get instance(): SocketManager {
        this._instance = this._instance || new SocketManager;
        return this._instance;
    }
	
    private  _socket: egret.WebSocket;
    private _timeSetOut: number;
    
    private _host: string;
    private _port: number;
    
    private _msgId: number;
    public  start(host:string,port:number):void{
        this._host = host;
        this._port = port;
        this._msgId = 1;
        this._socket = new egret.WebSocket();
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this._onReceiveMessage,this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this._onIoErr,this)
       // this._socket.addEventListener(egret.Event.CLOSE,this._onIoErr,this);
        this._socket.addEventListener(egret.Event.CONNECT,this._onSocketOpen,this);  
        this._socket.connect(host,port)
    }
    private  _onSocketOpen(e:egret.Event): void {
        console.log("连接成功");
        this.dispatchEvent(new GameEvent(GameEvent.SOCKET_CONNECTED))
    }
    
    
    private _onIoErr(e:any):void{
        console.log("io错误");
        this._socket.close();
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this._onReceiveMessage,this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR,this._onIoErr,this)
        this._socket.removeEventListener(egret.Event.CONNECT,this._onSocketOpen,this);  
        this._timeSetOut = egret.setTimeout(this.start,this,100,this._host,this._port)
    }
    
    private  _onReceiveMessage(e: egret.Event): void {
        this._readSocket();
    }
    
    private _readSocket():void{
        try{
            var msg = this._socket.readUTF();
            var obj: BaseMsg = JSON.parse(msg);
            this.dispatchEvent(new GameEvent(obj.url,obj.parameters));
            this._readSocket();
        }catch(err){
            console.log("没有数据了");
        }
    }

    
    public send(obj: BaseMsg): void {
        if(this._msgId==500){
            this._msgId = 10;
        }else{
            this._msgId += 1;
        }
        obj.actionid = this._msgId;
        var str: string = JSON.stringify(obj);
        this._socket.writeUTF(str);
        this._socket.flush();
    }
    
    
    
    
    
    
    
    
    
    
    
    
}
