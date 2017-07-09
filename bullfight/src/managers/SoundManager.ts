/**
 *
 * @author 
 *
 */
class SoundManager {
    private static _soundManager: SoundManager;
    public static get instance(): SoundManager {
        this._soundManager = this._soundManager || new SoundManager;
        return this._soundManager;
    }
    private _soundEffect: egret.Sound;//音效
    private _soundChannelEffect: egret.SoundChannel;//控制音效
    private _soundMusic: egret.Sound;//背景音乐
    private _soundChannelMusic: egret.SoundChannel;//控制背景音乐
    private _soundMusicStartTime: number = 0;//背景音乐开始时间
    private _nowName: string;//当前背景音乐名字
    private _nowSoundName: string;//当前音效名字
    public start() {

    }
    public set nowName(val: string) {
        this._nowName = val;
    }
    public get nowName(): string {
        return this._nowName;
    }
    public set nowSoundName(val: string) {
        this._nowSoundName = val;
    }
    public get nowSoundName(): string {
        return this._nowSoundName;
    }
    private _isOpenSound: boolean = true;
    private _isOpenMusic: boolean = true;
    public set isOpenSound(val: boolean) {
        this._isOpenSound = val;
    }
    public get isOpenSound(): boolean {
        return this._isOpenSound;
    }
    public set isOpenMusic(val: boolean) {
        this._isOpenMusic = val;
    }
    public get isOpenMusic(): boolean {
        return this._isOpenMusic;
    }
    /**
    * 播放背景音乐
    */
    public playMusic(name: string, loop: number = 1): egret.SoundChannel {
        this.nowName = name;
        try {
            if (!name) {
                return;
            }
            if (this._soundMusic) {
                this.stopMusic();
            }
            // var iom = egret.localStorage.getItem("iom");
            if (this.isOpenMusic == true) {
                this._soundMusic = RES.getRes(name);
                this._soundChannelMusic = this._soundMusic.play(this._soundMusicStartTime, loop);
            }
        } catch (e) {
            console.log("音乐加载失败");
        }
        return this._soundChannelMusic;
    }
    /**
     * 停止背景音乐
     */
    public stopMusic() {
        if (this._soundChannelMusic) {
            // this._soundMusicStartTime = this._soundChannelMusic.position;
            this._soundChannelMusic.stop();
            //this._soundMusic.close();
        }
    }
    /**
     * 背景音乐暂停
     */
    public bgReplay() {
        this.stopMusic();
        this._soundChannelMusic = this._soundMusic.play();
        // this.playMusic(this.nowName);
    }
    /**
     * 播放音效
     */
    public playSoundEffect(name: string, loop: number = 1, isclose: number = 0) {
        this.nowSoundName = name;
        try {
            if (!name) {
                return;
            }
            if (this._soundEffect && isclose == 0) {
                this.stopSoundEffect();
            }
            // var ios = egret.localStorage.getItem("ios");
            if (this.isOpenSound == true) {
                this._soundEffect = RES.getRes(name);
                this._soundChannelEffect = this._soundEffect.play(0, loop);
            }
        } catch (e) {
            console.log("音乐加载失败");
        }
    }
    /**
       * 停止音效 
       */
    public stopSoundEffect() {
        if (this._soundChannelEffect) {
            this._soundChannelEffect.stop();
        }
    }
    /**
     * 继续播放背景音乐
     */
    public keepOnMusic() {
        this.playMusic(this.nowName, 0);
    }
    /**
     * 继续播放音效
     */
    public keepOnSound() {
        this.playSoundEffect(this.nowSoundName);
    }
    /**
     * 背景音乐
     */
    public bg_music() {
        this.playMusic("bg_music_mp3", 0);
    }
    /**
     * 游戏背景音乐
     */
    public game_bg_music() {
        this.playMusic("game_bg_music_mp3", 0);
    }
    /**
     * 按钮音效
     * val 1，2，3代表需要的按钮音效
     */
    public buttonSound(val: number) {
        this.playSoundEffect("button" + val + "_mp3", 1, 1);
    }
    /**
     * 筹码音效1
     */
    public chip1() {
        this.playSoundEffect("chip_mp3", 1, 1);
    }
    /**
     * 筹码音效2
     */
    public chip2() {
        this.playSoundEffect("chip2_mp3", 1, 1);
    }
    /**
     * 发牌1
     */
    public licensing1() {
        this.playSoundEffect("Licensing_mp3", 1, 1);
    }
    /**
     * 发牌2
     */
    public licensing2() {
        this.playSoundEffect("Licensing1_mp3");
    }
    /**
     * 发牌3
     */
    public licensing3() {
        this.playSoundEffect("Licensing2_mp3");
    }
    /**
     * 加金币
     */
    public addGold() {
        this.playSoundEffect("addgold_mp3");
    }
    /**
     * 掌声
     */
    public applause() {
        this.playSoundEffect("applause_mp3");
    }
    /**
     * 购买
     */
    public buy() {
        this.playSoundEffect("buy_mp3");
    }
    /**
     * 跟注 男
     */
    public callmale() {
        this.playSoundEffect("callmale_mp3");
    }
    /**
     * 跟注 女
     */
    public callfemale() {
        this.playSoundEffect("callfemale_mp3");
    }
    /**
     * 相机
     */
    public camera() {
        this.playSoundEffect("camera_mp3");
    }
    /**
     * 椅子
     */
    public chair() {
        this.playSoundEffect("chair_mp3");
    }
    /**
     * 过牌 女
     */
    public checkfemale() {
        this.playSoundEffect("checkfemale_mp3");
    }
    /**
     * 过牌 男
     */
    public checkmale() {
        this.playSoundEffect("checkmale_mp3");
    }
    /**
     * 当前回合
     */
    public currentround() {
        this.playSoundEffect("currentround_mp3", 1, 1);
    }
    /**
     * 对话
     */
    public dialogue() {
        this.playSoundEffect("dialogue_mp3");
    }
    /**
     * 弃牌 女
     */
    public discardfemale() {
        this.playSoundEffect("discardfemale_mp3");
    }
    /**
     * 弃牌 男
     */
    public discardmale() {
        this.playSoundEffect("discardmale_mp3");
    }
    /**
     * 退出
     */
    public exit() {
        this.playSoundEffect("exit_mp3");
    }
    /**
     * 失败
     */
    public fail() {
        this.playSoundEffect("fail_mp3");
    }
    /**
     * 加注 女
     */
    public fillfemale() {
        this.playSoundEffect("fillfemale_mp3");
    }
    /**
     * 加注 男
     */
    public fillmale() {
        this.playSoundEffect("fillmale_mp3");
    }
    /**
     * 派牌
     */
    public flop() {
        this.playSoundEffect("flop_mp3");
    }
    /**
     * 返回
     */
    public return() {
        this.playSoundEffect("return_mp3");
    }
    /**
     * 坐下
     */
    public sitdown() {
        this.playSoundEffect("sitdown_mp3");
    }
    /**
     * 时间
     */
    public time() {
        this.playSoundEffect("time_mp3", 1, 1);
    }
    /**
     * 点击
     */
    public touch() {
        this.playSoundEffect("touch_mp3");
    }
    /**
     * 敲击
     */
    public tunk() {
        this.playSoundEffect("tunk_mp3");
    }
    /**
     * 结算提示
     */
    public winpromt() {
        this.playSoundEffect("winpromt_mp3");
    }
    /**
     * 赢得胜利
     */
    public winvictory() {
        this.playSoundEffect("winvictory_mp3");
    }
    /**
     * 斗牛结果播报
     */
    public playDouNiuResult(val) {
        this.playSoundEffect("niu_" + val + "_mp3");
    }
    /**
     * 开始/停止下注
     */
    public playBet(n: number = 0) {
        var str = "";
        if (n == 0) {
            str = "start_bet_mp3";
        } else {
            str = "stop_bet_mp3";
        }
        this.playSoundEffect(str);
    }

}
