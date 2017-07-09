/**
 * DeviceManager
 */
class DeviceManager {
    public constructor() {

    }
    private static _instance: DeviceManager;
    public static get instance(): DeviceManager {
        this._instance = this._instance || new DeviceManager;
        return this._instance
    }
    /**
     * 设备震动  要把手机的静音关掉
     */
    public deviceVibrate(parameters: any) {
        try {
            var b: boolean = navigator.vibrate(parameters);
            if (!b) {
                console.log("手机暂不支持震动功能!!!");
            }
        } catch (e) { console.log(e); }

    }


    public needSound: boolean;
    /**
     * 初始化
     */

    /*
    苹果手机操作系统 "iOS"
    安卓手机操作系统 "Android"
    微软手机操作系统 "Windows Phone"
    微软桌面操作系统 "Windows PC"
    苹果桌面操作系统 "Mac OS"
    未知操作系统 "Unknown"
    */
    public start() {
        console.log(egret.Capabilities.os);
    }

}