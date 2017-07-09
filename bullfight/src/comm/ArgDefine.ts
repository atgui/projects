/**
 *
 * @author 
 *
 */
class ArgDefine {
	public constructor() {
	}
	//游戏配置信息
    public static CMD_GAME_CONFIG: string = "gamecfgCMD";
      
    //路单
    public static CMD_WAYBILL: string = "billwaysCMD";

    
    
    
    /**
     *登陆
     **/ 
    public static CMD_LOGIN: string = "loginCMD";
    
    /**
     * 加入桌台
     **/ 
    public static CMD_JOIN: string = "joinCMD";
    
    /**
     * 游戏状态
     **/ 
    public static CMD_GAME_STATE: string = "GameStateCMD";
    
    /**
     * 游戏准备
     **/ 
    public static CMD_GAME_PREPARE: string = "gamePrepare";
    
    /**
     * 选庄
     **/ 
    public static CMD_GAME_LANDLORD: string = "gameLandlord";
    
    /**
     * 发牌
     **/ 
    public static CMD_GAME_DEALPOKE: string = "gameDealPoke";
    
    /**
     * 每秒一次更新玩家状态 和  倒计时
     **/ 
    public static CMD_GAME_REFRESH_PLAYER: string = "gameRefreshOlayer";
    
    /**
     * 结算
     **/ 
    public static CMD_GAME_ACCOUNT: string = "gameAccount";
    
    
    
}
