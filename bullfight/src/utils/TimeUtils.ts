module utils {
	export class TimeUtils {
		public constructor() {
		}
		/**
		 * 返回当前时间
		 * val 1：返回日期 2：返回时间 3：返回日期和时间
		 */
		public static nowTime(val: number): string {
			var ntime: Date = new Date();
			var year = ntime.getFullYear();//年
			var month = ntime.getMonth();//月
			var day = ntime.getDate();//日
			var hours = ntime.getHours();//时
			var minutes = ntime.getMinutes();//分
			var seconds = ntime.getSeconds();//秒
			var strtime: string;
			if (val == 1) {
				strtime = year + "-" + month + "-" + day;
			} else if (val == 2) {
				strtime = hours + ":" + minutes + ":" + seconds;
			} else if (val == 3) {
				strtime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			}
			return strtime;
		}
		//开始时间 s  15：30:00
		//16：00

		//总时长 t 30分钟
		//当前时间


		public downTime(): number {

			return 0;
		}

		//返回离线时长
		public static offLineTime(lastT: number): string {
			var ntime: Date = new Date();
			var nS: number = ntime.getTime();
			var lt: number = lastT - 0;
			var scT: number = nS - lt;

			var fzByM: number = 1000 * 60;
			var xsByM: number = 1000 * 60 * 60;
			var dByM: number = 1000 * 60 * 60 * 24;
			var zByM: number = 1000 * 60 * 60 * 24 * 7;

			var num1: number = 0;
			var str1: string = "";
			if (scT >= zByM) {
				num1 = Math.floor(scT / zByM);
				str1 = "周";
			} else if (scT >= dByM) {
				num1 = Math.floor(scT / dByM);
				str1 = "天";
			} else if (scT >= xsByM) {
				num1 = Math.floor(scT / xsByM);
				str1 = "小时";
			} else {
				num1 = Math.floor(scT / fzByM);
				str1 = "分钟";
			}
			return num1.toString(10) + str1;

		}

		/**
		 * 根据毫秒数返回时分秒  00:00:00
		 */
		public static getStrSFMByMs(msT: number): string {
			var mByM: number = Math.floor(msT / 1000);
			var fzByM: number = 60;
			var xsByM: number = 3600;

			var xsNum: number = Math.floor(mByM / xsByM);
			var fzNum: number = Math.floor((mByM - xsNum * xsByM) / fzByM);
			var mNum: number = mByM - fzNum * fzByM - xsNum * xsByM;

			var xsStr: string = xsNum > 9 ? xsNum.toString() : "0" + xsNum.toString();
			var fzStr: string = fzNum > 9 ? fzNum.toString() : "0" + fzNum.toString();
			var mStr: string = mNum > 9 ? mNum.toString() : "0" + mNum.toString();

			return xsStr + ":" + fzStr + ":" + mStr;
		}
		/**
		 * 根据毫秒数返回时分秒  00:00:00
		 */
		public static getStrSFMByMs1(msT: number): string {
			var mByM: number = Math.floor(msT / 1000);
			var fzByM: number = 60;
			var xsByM: number = 3600;

			var xsNum: number = Math.floor(mByM / xsByM);
			var fzNum: number = Math.floor((mByM - xsNum * xsByM) / fzByM);
			var mNum: number = mByM - fzNum * fzByM - xsNum * xsByM;

			var xsStr: string = xsNum > 9 ? xsNum.toString() : "0" + xsNum.toString();
			var fzStr: string = fzNum > 9 ? fzNum.toString() : "0" + fzNum.toString();
			var mStr: string = mNum > 9 ? mNum.toString() : "0" + mNum.toString();

			return xsStr + "时" + fzStr + "分" + mStr + "秒";
		}
		/**
		 * 根据毫秒数返回时月日
		 */
		public static getStrYRByMs(msT: number): string {
			var num: number = msT - 0;
			var date: Date = new Date(num);

			var yueStr: string = (date.getUTCMonth() + 1).toString();
			var riStr: string = date.getDate().toString();

			return yueStr + "月" + riStr + "日";
		}

		/**
		 * 根据毫秒数返回 天 时分秒
		 */
		public static getStrDHMS(msT: number) {
			var date1 = new Date();    //开始时间
			var date3 = msT - date1.getTime();  //时间差的毫秒数

			var miaoByH: number = 1000;
			var fzByM: number = 60;
			var xsByF: number = 60;
			var tianByX: number = 24;

			//计算出相差天数
			var days = Math.floor(date3 / (tianByX * xsByF * fzByM * miaoByH));
			date3 = date3 - days * (tianByX * xsByF * fzByM * miaoByH);
			//计算出相差小时
			var hours = Math.floor(date3 / (xsByF * fzByM * miaoByH));
			date3 = date3 - hours * (xsByF * fzByM * miaoByH);
			//计算相差分钟数      //计算小时数后剩余的毫秒数
			var minutes = Math.floor(date3 / (fzByM * miaoByH));
			date3 = date3 - minutes * (fzByM * miaoByH);
			//计算相差秒数
			var seconds = Math.round(date3 / miaoByH);

			var hourStr: string = hours < 10 ? "0" + hours : hours + "";
			var mStr: string = minutes < 10 ? "0" + minutes : minutes + "";
			var sStr: string = seconds < 10 ? "0" + seconds : seconds + "";

			var str = days + "天" + hourStr + ":" + mStr + ":" + sStr;
			return str;
		}
		
		/**
		 * 得到从某个时间到当前时间之间相隔的天数
		 */
		public static getDay(reTime: number): number {
			//当前时间-注册时间的 5点整
			//判断注册时间,大于当天的 5点,按5点算，小于的不管
			var reDate = new Date();
			reDate.setTime(reTime);
			var reTimeDate: string = reDate.getFullYear() + "-" + (reDate.getMonth() + 1) + "-" + reDate.getDate() + " 05:00:00";
			var endDate1 = new Date(reTimeDate);
			var msT = new Date();
			var msTime: number = msT.getTime();
			var enTime: number = endDate1.getTime();
			var date3 = msT.getTime() - reTime;
			if (reTime > enTime) {//大于
				date3 = msTime - enTime;
			}

			var miaoByH: number = 1000;
			var fzByM: number = 60;
			var xsByF: number = 60;
			var tianByX: number = 24;

			//计算出相差天数
			var days = Math.ceil(date3 / (tianByX * xsByF * fzByM * miaoByH));
			return days;
		}
	}
}