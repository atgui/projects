/**
 * 数字工具
 */
class NumberUtils {
	public constructor() {
	}
	/**
	 * 保留两位小数
	 * 单位:百万(M)
	 */
	public static to(n: number): string {
		var r: any = 0;
		var str: string = "";
		if(n==0){
			return "0";
		}
		if(!n){
			return "0";
		}
		if (n) {
			if (n >= 1000000) {
				r = n / 1000000;
				str =r.toFixed(1)+ "万";
			}else{
				r=n;
				str=r+"";
			}
			return str;
		} else {
			return "";
		}
	}
	/**
	 * 产生两个数之间的随机数
	 * max:最大数
	 * min:最小数
	 */
	public static random(min:number,max:number=0){
		return Math.floor(Math.random() * (max - min + 1))+min;
	}

}