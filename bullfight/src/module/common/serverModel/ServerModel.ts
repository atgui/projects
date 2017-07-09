module common {
	//所有的服务器模型
	export class ServerModel {
		public constructor() {
		}
	}

	/**
	 *服务器返回 下注的信息
	 */
	export class BullServer_BetDownModel {
		public constructor() {
		}
		/**
		 * 当前下注的用户
		 */
		public nowBetName: string;
		/**
		 * 游戏总下注
		 */
		public gameBetTotal: string;
		/**
		 * 游戏总下注总次数
		 */
		public gameBuyCount: string;
		/**
		 * 当前下注的区域  对应   黑红梅方
		 */
		public nowBetKey: string;
		/**
		 * 当前下注区域的下注值
		 */
		public nowBetNum: string;
		/**
		 * 当前所有下注区域的下注值
		 */
		public areaObj: any;//1234对应4个
	}


	/**
	 * 服务器返回  开奖结果的返回
	 */
	export class BullServer_Result {
		public constructor() {
		}
		public masterWin: number;//庄家输赢分值
		public resultData: Array<any>;//开奖结果数据
		public resultTime: number;//开奖结果展示倒计时
		public resultList: Array<any>;//个人中奖结果列表
		public winList: Array<any>;//中奖排行列表
		public myWinScore: number;//自己的输赢共计金币
		public areaBetInfo: any;//每个区域的总下注值数据
		public myScore: number;//个人已结算金币值

		/**
		 * 0是庄   1～4  分别从左到右
		 */
		public getCardListById(id: number): wanRenDouNiu.CardGroupModel {
			var cardGroup: wanRenDouNiu.CardGroupModel = new wanRenDouNiu.CardGroupModel(this.resultData[id]);
			return cardGroup;
		}

		/**
		 * 自己在每个区域的中奖记录  返回的数值里  0～3  对应  黑红梅方  的中奖金额   4 是总胜负的数值
		 */
		public get aeraWinInfo(): Array<BullServer_Result_Item> {
			var winInfoList: Array<BullServer_Result_Item> = new Array<BullServer_Result_Item>();
			for (var i: number = 0; i < 5; i++) {
				winInfoList[i] = new BullServer_Result_Item();
			}
			for (var i: number = 0; i < this.resultList.length; i++) {
				var data = this.resultList[i];
				var name: string = data[ServerKey.USER_NAME]
				if (name == player.PlayerControl.instance.mySelf.username) {
					var id: number = data[ServerKey.KEY] - 1;
					var rate: number = data[ServerKey.ODDS];
					var isWin: boolean = data[ServerKey.IS_WIN];
					var xs: number = isWin == true ? 1 : -1;
					var betScore: number = data[ServerKey.VALUE];
					var winScore: number = xs * data[ServerKey.WIN_BET];

					winInfoList[id].rate = rate;
					winInfoList[id].betScore += betScore;
					winInfoList[id].winScore += winScore;
					winInfoList[4].betScore += betScore;
					winInfoList[4].winScore += winScore;
				}
			}
			return winInfoList;
		}


		/**
		 * 总结过列表 返回数组的 前十个（数组索引0·9）是玩家的输赢前十名 
		 */
		public get allWinInfo(): Array<BullServer_Result_Item> {
			var winInfoList: Array<BullServer_Result_Item> = new Array<BullServer_Result_Item>();
			var dic: any = new Object();
			//zhuangItem.winScore=SFSObjectKeyCode.MSG
			for (var i: number = 0; i < this.winList.length; i++) {
				var data = this.winList[i];
				var name: string = data[ServerKey.NICK_NAME];
				var dItem: BullServer_Result_Item;
				if (dic[name]) {
					dItem = dic[name];
				} else {
					dItem = new BullServer_Result_Item();
					dic[name] = dItem;
				}
				dItem.name = name;

				var id: number = data[ServerKey.KEY] - 1;
				var isWin: boolean = data[ServerKey.IS_WIN];
				var winScore: number = data[ServerKey.WIN_BET];

				dItem.winScore += winScore;

			}
			var dicArr: Array<BullServer_Result_Item> = new Array<BullServer_Result_Item>();
			for (var key in dic) {
				dicArr.push(dic[key]);
			}
			dicArr.sort(function (a: BullServer_Result_Item, b: BullServer_Result_Item): number {
				return a.winScore - b.winScore;
			})
			for (var i: number = 0; i < 10; i++) {
				if (i < dicArr.length) {
					winInfoList.push(dicArr[i]);
				}
			}
			return winInfoList;
		}
	}
	/**
	 * 牛牛结果的Item
	 */
	export class BullServer_Result_Item {
		public constructor() {
			this.rate = 1;
			this.betScore = 0;
			this.winScore = 0;
		}
		//名字
		public name: string;
		//赔率
		public rate: number;
		//下注的分数
		public betScore: number;
		//赢得的分数  赢是正数，输为负数
		public winScore: number;

	}
	/**
	 * 牛牛下注总金币实时推送
	 */
	export class BullServer_bull_all_downbet {
		public constructor() {
		}
		public betList: Array<any>;//下注数据列表
		public gameBuyCount: number;//斗牛桌面总下注手数
		public areaObj: any;//1234对应4个  每个区域的总下注值数据

		public get otherBetInfo(): Array<BullServer_bull_all_BetItem> {
			var infoList: Array<BullServer_bull_all_BetItem> = new Array<BullServer_bull_all_BetItem>();
			var infoDic: any = new Object();
			for (var i: number = 0; i < this.betList.length; i++) {
				var data = this.betList[i];
				var dname: string = data[ServerKey.USER_NAME];
				var myName: string = player.PlayerControl.instance.mySelf.username;
				var item: BullServer_bull_all_BetItem;
				if (dname != myName) {
					if (infoDic[dname]) {
						item = infoDic[dname];
					} else {
						var item: BullServer_bull_all_BetItem = new BullServer_bull_all_BetItem();
						item.betName = data[ServerKey.USER_NAME];
						infoDic[dname] = item;
						infoList.push(item);
					}
					item.areaIdList.push(data[ServerKey.KEY]);
					item.betNumList.push(data[ServerKey.VALUE]);
				}
			}
			return infoList;
		}
	}
	/**
	 * 牛牛下注总金币实时推送的ITEM
	 */
	export class BullServer_bull_all_BetItem {
		public constructor() {
			this.areaIdList = new Array<number>();
			this.betNumList = new Array<number>();
		}
		public areaIdList: Array<number>;//下注区域ID  list
		public betName: string;//下注者的名字
		public betNumList: Array<number>;//下注量   list
	}
	/**
	 * 上庄列表信息
	 */
	export class BullServer_bull_master_list {
		public constructor() {
		}
		public mstersList: Array<any>;//上庄用户的账户
		public minNeedScore: number;//上庄要求的最低金币数
	}


	/**
	 * 座位信息
	 */
	export class BullServer_BULL_SEAT {
		public constructor() {
		}
		public seatInfo: Array<string>;//所有上座信息
		public isInSeat: boolean;//自己是否上座
	}

	/**
	 * 庄家信息
	 */
	export class BankerInfoModel {
		public constructor() {
		}
		public bankerName: string;//庄家名
		public ident: string;//标识
		public bankerGold: number;//金币
	}
	/**
	 * 富豪排行信息
	 */
	export class FortuneListModel {
		public constructor() {
		}
		public charm:number;//魅力
		public experience:number;//经验（声望）
		public goldbars: number;//钻石
		public goldcoins: number;//筹码
		public portrait:string;//头像
		public sex:number;//性别
		public nickname: string;//昵称
		public username: string;//用户名
	}
	/**
	 * 魅力排行信息
	 */
	export class CharmListModel {
		public constructor() {
		}
		public charm:number;//魅力
		public experience:number;//经验（声望）
		public goldbars: number;//钻石
		public goldcoins: number;//筹码
		public portrait:string;//头像
		public sex:number;//性别
		public nickname: string;//昵称
		public username: string;//用户名
	}
	/**
	 * 商城
	 */
	export class MallModel {
		public constructor() {
		}
		public dmmodArr: Array<DiamondsMallModel>;//钻石商城集合
		public cmmodArr: Array<ChipMallModel>;//筹码商城集合
	}
	/**
	 * 钻石信息
	 */
	export class DiamondsMallModel {
		public constructor() {
		}
		public content: any;//描述
		public experience: number;//经验（声望）
		public goldbars: number;//钻石
		public id: number;//ID
		public money: number;//金额（人名币）
	}
	/**
	 * 筹码信息
	 */
	export class ChipMallModel {
		public constructor() {
		}
		public content: any;//描述
		public goldbars: number;//钻石
		public goldcoins: number;//筹码
		public id: number;//ID
	}
	/**
	 * 邮件信息
	 */
	export class MailModel {
		public constructor() {
		}
		public content: string;//邮件内容信息
		public goldcoins: number;//筹码数量
		public id: number;//ID
		public title: string;//标题
	}
}