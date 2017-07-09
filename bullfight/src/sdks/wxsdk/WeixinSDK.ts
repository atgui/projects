module sdks {
	export class WeixinSDK {
		private _wsSDK: any;
		private _isSuccess: boolean;
		public constructor() {
			this._wsSDK = window["wx"];
			this._isSuccess = false;

		}
		private _userInfo: WXUserInfo;
		public get userInfo(): WXUserInfo {
			return this._userInfo;
		}
		public get isSuccess(): boolean {
			return this._isSuccess;
		}

		/**
		 * 初始化
		 */
		public start(obj) {
			var thisObj = this;
			this._wsSDK.ready(function () {
				thisObj._isSuccess = true;
				//var popView: popup.Prompt1Popup = new popup.Prompt1Popup("提示", "微信注入成功", null, this);
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				//thisObj.shareByUrl();
				thisObj.hideShowMenuItems();
			});
			this._wsSDK.error(function (res) {
				var str: string = <string>res;
				//var popView: popup.Prompt1Popup = new popup.Prompt1Popup("提示", str, null, this);
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			});
			this._wsSDK.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: obj.appId, // 必填，公众号的唯一标识
				timestamp: obj.timestamp, // 必填，生成签名的时间戳
				nonceStr: obj.nonceStr, // 必填，生成签名的随机串
				signature: obj.signature,// 必填，签名，见附录1
				jsApiList: ["getNetworkType",
					"startRecord",
					"stopRecord",
					"onVoiceRecordEnd",
					"playVoice",
					"pauseVoice",
					"stopVoice",
					"onVoicePlayEnd",
					"uploadVoice",
					"downloadVoice",
					"chooseImage",
					"previewImage",
					"uploadImage",
					"downloadImage",
					"onMenuShareTimeline",
					"onMenuShareAppMessage",
					"hideMenuItems",
					"showMenuItems",
					"getLocation",
					"chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		}

		/**
		 * 获取玩家信息
		 */
		public getUser(openid: string, comeBack: Function, evt: any) {
			var urlLoad: egret.URLLoader = new egret.URLLoader();
			var url: string = "https://api.weixin.qq.com/cgi-bin/user/info?";
			url += "access_token=" + "ACCESS_TOKEN";
			url += "&openid=" + openid;
			url += "&lang=zh_CN";
			var request: egret.URLRequest = new egret.URLRequest(url);
			request.method = egret.URLRequestMethod.GET;
			urlLoad.addEventListener(egret.Event.COMPLETE, resultFuc, this);
			function resultFuc(e: egret.Event) {
				urlLoad.removeEventListener(egret.Event.COMPLETE, resultFuc, this);
				var dataE: string = this._urlLoad.data;
				var obj: Object = JSON.parse(dataE);
				this._userInfo = obj;
				comeBack.apply(evt)
			}
			urlLoad.load(request);
		}

		/**
		 * 返回网络类型2g，3g，4g，wifi
		 */
		public getNetworkType() {
			this._wsSDK.getNetworkType({
				success: function (res) {
					var networkType = res.networkType;
					alert(networkType);
				}
			});
		}
		/**
		 * 开始录制
		 */
		public startRecord(comeback, thisObj) {
			comeback(thisObj);
			this._wsSDK.startRecord();
		}
		/**
		 * 停止录制
		 */
		public stopRecord(comeback, thisObj) {
			this._wsSDK.stopRecord({
				success: function (res) {
					var localId = res.localId;
					comeback(localId, thisObj);
				}
			});
		}
		/**
		 * 录音时间超过一分钟没有停止的时候会执行 complete 回调
		 */
		public onVoiceRecordEnd(comeback, thisObj) {
			this._wsSDK.onVoiceRecordEnd({
				// 录音时间超过一分钟没有停止的时候会执行 complete 回调
				complete: function (res) {
					var localId = res.localId;
					comeback(localId, thisObj);
				}
			});
		}

		/**
		 * 已播放的ID
		 */
		private _playLocalId: any = "-1";
		/**
		 * 播放
		 */
		public playVoice(localId, comeback, thisObj) {
			// if (SoundManager.instance.temporaryIsPause == true) {
			// 	return;
			// }
			if (this._playLocalId != localId) {
				//this.stopVoice(this._playLocalId); // 需要停止的音频的本地ID，由stopRecord接口获得
			}
			this._playLocalId = localId;
			this.onVoicePlayEnd(comeback, thisObj);
			this._wsSDK.playVoice({
				localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
			});
			// SoundManager.instance.temporaryPause();
		}
		/**
		 * 停止播放
		 */
		public stopVoice(localId) {
			this._wsSDK.stopVoice({
				localId: localId // 需要停止的音频的本地ID，由stopRecord接口获得
			});
			// SoundManager.instance.recoverTemporary();
		}
		/**
		 * 播放结束
		 */
		public onVoicePlayEnd(successFuc, thisObj) {
			this._wsSDK.onVoicePlayEnd({
				success: function (res) {
					// SoundManager.instance.recoverTemporary();
					var localId = res.localId; // 返回音频的本地ID
					successFuc(thisObj);
				}
			});
		}
		/**
		 * 上传
		 */
		public uploadVoice(localId, successFuc, thisObj) {
			this._wsSDK.uploadVoice({
				localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					var serverId = res.serverId; // 返回音频的服务器端ID
					successFuc(serverId, thisObj);
					alert("上传complete")
				}
			});
			alert("上传开始")
		}
		/**
		 * 下载
		 */
		public downloadVoice(serverId, successFuc, thisObj) {
			this._wsSDK.downloadVoice({
				serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					var localId = res.localId; // 返回音频的本地ID
					successFuc(localId, thisObj);
				}
			});
		}

		/**
		 * 识别
		 */
		public translateVoice(soundId, comeback, thisObj) {
			this._wsSDK.translateVoice({
				localId: soundId, // 需要识别的音频的本地Id，由录音相关接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					comeback(res.translateResult, thisObj); // 语音识别的结果
				}
			});
		}
		/**
		 *  拍照或从手机相册中选图接口
		 * */
		public chooseImage(comeback, thisObj) {
			this._wsSDK.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					comeback(localIds, thisObj);
				}
			});
		}
		/**
		 * 预览图片接口
		 */
		public previewImage() {
			this._wsSDK.previewImage({
				current: '', // 当前显示图片的http链接
				urls: [] // 需要预览的图片http链接列表
			});
		}

		/**
		 * 上传图片接口
		 */
		public uploadImage(localId, comeback, thisObj) {
			this._wsSDK.uploadImage({
				localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					var serverId = res.serverId; // 返回图片的服务器端ID
					comeback(serverId, thisObj);
				}
			});
		}

		/**
		 * 下载图片接口
		 */
		public downloadImage(serverId, comeback, thisObj) {
			this._wsSDK.downloadImage({
				serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					var localId = res.localId; // 返回图片下载后的本地ID
					comeback(localId, thisObj);
				}
			});
		}


		public shareByUrl() {
			// // var gc: config.GameConfig = ConfigManager.instance.getGameConfig();
			// // var url = gc.shareUrl;
			// var userId = ProxyMnager.instance.roleProxy.heroModel.id;
			// url += "?user_id=" + userId;
			// url += "&fun_code=" + 101;
			// var rId: number = Math.random();
			// var imgUrl = window["qqwb_IconUrl"]+"?dxd=" + rId;
			// this.onMenuShareTimeline(url, imgUrl);
			// this.onMenuShareAppMessage(url, imgUrl);
		}
		/**
		 * 分享给朋友圈
		 */
		public onMenuShareTimeline(url: string, imgUrl: string) {
			this._wsSDK.onMenuShareTimeline({
				title: '小小冒险队', // 分享标题
				link: url, // 分享链接
				imgUrl: imgUrl, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
		}


		/**
		 * 分享给朋友
		 */
		public onMenuShareAppMessage(url: string, imgUrl: string) {
			this._wsSDK.onMenuShareAppMessage({
				title: '小小冒险队', // 分享标题
				desc: '一个好玩的挂机游戏', // 分享描述
				link: url, // 分享链接
				imgUrl: imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
					var popView: popup.Prompt1Popup = new popup.Prompt1Popup("提示", "分享成功", null, this);
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
		}


		/**
		 * 批量隐藏和显示功能按钮接口
		 */
		public hideShowMenuItems() {
			this._wsSDK.hideMenuItems({
				menuList: ["copyUrl"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			});
			this._wsSDK.showMenuItems({
				menuList: [
					'menuItem:profile', // 添加查看公众号
					'menuItem:addContact'
				]
        	});
		}


		/**
		 * 玩家地理位置信息
		 */
		public getLocation(comeback, thisObj) {
			this._wsSDK.getLocation({
				type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
				success: function (res) {
					var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					//var speed = res.speed; // 速度，以米/每秒计
					//var accuracy = res.accuracy; // 位置精度
					comeback(thisObj, longitude, latitude);
				}
			});
		}

		/**
		 * 微信支付
		 */
		public chooseWXPay(comeback, thisObj, wxPayJ) {
			this._wsSDK.chooseWXPay({
				timestamp: wxPayJ.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: wxPayJ.nonceStr, // 支付签名随机串，不长于 32 位
				package: wxPayJ.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: wxPayJ.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: wxPayJ.paySign, // 支付签名
				success: function (res) {
					// 支付成功后的回调函数
					comeback(thisObj);
				}
			});
		}
	}
}