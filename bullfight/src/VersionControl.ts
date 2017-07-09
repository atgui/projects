class VersionControl extends RES.VersionController{
	public constructor() {
		super();
	}

	public getVirtualUrl(url:string):string{
		var obj=window["winObj"];
		var vStr:string=obj.version;
		return url+"?v="+vStr;
	}
}