class ConfigManager {
	public constructor() {
	}
	private static _instance: ConfigManager;
	public static get instance(): ConfigManager {
		this._instance = this._instance || new ConfigManager;
		return this._instance
	}

	private _localConfig: any = new Object();//基本配置表
	private _charmGrowthDic: any = new Object();//魅力值成长表
	private _commondityDic: any = new Object();//商品表
	private _giftDic: any = new Object();//礼物表
	private _giftPacksDic: any = new Object();//礼包表
	private _growthDic: any = new Object();//vip成长表

	// public start(comeBack: Function, thisObj: any): void {
	// 	//this._zip = new JSZip(RES.getRes("config_zip"));
	// 	this._init();
	// 	comeBack.apply(thisObj);
	// }
	public start(): void {
		this._init();
	}
	private _init(): void {
		this._localConfig = this._getJsonByZip("gameConfig.json");

		this._addConfig(this._charmGrowthDic, "meilizhichengzhangConfig_json");
		this._addConfig(this._commondityDic, "shangpinConfig_json");
		this._addConfig(this._giftDic, "liwuConfig_json");
		this._addConfig(this._giftPacksDic, "libaoConfig_json");
		this._addConfig(this._growthDic, "chengzhangConfig_json");
	}
	private _getJsonByZip(url: string): any {
		url = url.split(/\?/)[0];
		//var str: string = this._zip.file("config/" + url).asText();
		var obj;
		return obj;
	}
	private _addConfig(dic: any, url: string, byIdName: string = "id"): void {
		// var list: Array<any> = this._getJsonByZip(url);
		var list: Array<any> = RES.getRes(url);
		if (!list) {
			return
		}
		for (var i: number = 0; i < list.length; i++) {
			var key: string = list[i][byIdName].toString(10);
			dic[key] = list[i];
		}
	}
	public get httpServerUrl(): string {
		return this._localConfig.areas[this._localConfig.index].url;
	}

	/**
	 * 根据id获取魅力值
	 */
	public getCharmGrowthConfig(key: number): config.CharmGrowthConfig {
		var dkey: string = key.toString(10);
		var obj = this._charmGrowthDic[dkey];
		return ObjectUtils.clone(obj);
	}
	/**
	 * 根据魅力值获取的称号
	 */
	public getCharmGrowthByCharmVal(charm: number): config.CharmGrowthConfig {
		var charmConfig: config.CharmGrowthConfig = null;
		for (var key in this._charmGrowthDic) {
			var cgdConfig = this._charmGrowthDic[key];
			if (cgdConfig.charm == charm) {
				charmConfig = new config.CharmGrowthConfig();
				ObjectUtils.batchVest(cgdConfig, charmConfig);
				break;
			}
		}
		return charmConfig;
	}
	/**
	 * 根据id获取商品信息
	 */
	public getCommondityhConfig(key: number): config.CommodityConfig {
		var dkey: string = key.toString(10);
		var obj = this._commondityDic[dkey];
		return ObjectUtils.clone(obj);
	}
	/**
	 * 获取所有商品
	 */
	public getAllCommondityConfig(): Array<config.CommodityConfig> {
		var list = this._commondityDic;
		var cdcList: Array<config.CommodityConfig> = new Array<config.CommodityConfig>();
		for (var key in list) {
			var cdc: config.CommodityConfig = new config.CommodityConfig();
			ObjectUtils.batchVest(list[key], cdc);
			cdcList.push(cdc);
		}
		return cdcList;
	}
	/**
	 *根据id获得礼物信息
	 */
	public getGiftConfig(key: number): config.GiftConfig {
		var dkey: string = key.toString(10);
		var obj = this._giftDic[dkey];
		return ObjectUtils.clone(obj);
	}
	/**
	 * 获取所有礼物
	 */
	public getAllGiftConfig(): Array<config.GiftConfig> {
		var list = this._giftDic;
		var giftList: Array<config.GiftConfig> = new Array<config.GiftConfig>();
		for (var key in list) {
			var gift: config.GiftConfig = new config.GiftConfig();
			ObjectUtils.batchVest(list[key], gift);
			giftList.push(gift);
		}
		return giftList;
	}
	/**
	 * 根据id获得礼包信息
	 */
	public getGiftPacksConfig(key: number): config.GiftPacksConfig {
		var dkey: string = key.toString(10);
		var obj = this._giftPacksDic[dkey];
		return ObjectUtils.clone(obj);
	}
	/**
	 * 根据vip等级获得vip成长信息
	 */
	public getVIPGrowthByLevel(level: number): config.GrowthConfig {
		var vipgConfig: config.GrowthConfig = null;
		for (var key in this._growthDic) {
			var cgdConfig = this._growthDic[key];
			if (cgdConfig.level == level) {
				vipgConfig = new config.GrowthConfig();
				ObjectUtils.batchVest(cgdConfig, vipgConfig);
				break;
			}
		}
		return vipgConfig;
	}
	/**
	 * 获取所有vip成长信息
	 */
	public getAllVIPGrowthConfig(): Array<config.GrowthConfig> {
		var list = this._growthDic;
		var growList: Array<config.GrowthConfig> = new Array<config.GrowthConfig>();
		for (var key in list) {
			var grow: config.GrowthConfig = new config.GrowthConfig();
			ObjectUtils.batchVest(list[key], grow);
			growList.push(grow);
		}
		return growList;
	}
}