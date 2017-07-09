/**
 *
 * @author 
 *
 */
class GameEvent extends egret.Event {
    public constructor(type: string,data:any=null,bubbles:boolean=false,cancelable:boolean=false) {
        super(type,bubbles,cancelable,data);
	}
	/**
     * 初始化完成
     */
    public static INIT_COMPLETE:string="init_complete";
	/**
	 * 时间改变
	 */ 
	public static TIME_CHANGE:string="time_change";
	/*
	 * 本地模型数据变更
	 */ 
    public static DATA_CHANGE: string = "data_change";
    /**
     * 下注数量变更
     */ 
    public static BETNUM_CHANGE:string="betNum_change";
    /**
     * 当前游戏状态变更
     */ 
    public static NOWSTATE_CHANGE:string="nowState_change";
    /*
     * socket 连接成功
     */ 
    public static SOCKET_CONNECTED: string = "socket_connected";
    /*
     * socket 有数据到来
     */ 
    public static SOCKET_COME: string = "socket_come";
}
