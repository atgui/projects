class ObjectUtils {
	public constructor() {
	}

	public static isType(obj, type): boolean {
		return Object.prototype.toString.call(obj) === "[object " + type + "]";
	}


	/**
	 * 深克隆
	 */
	public static clone(obj): any {
		var newObj: any = new Object();
		for (var p in obj) {
			//newObj[p] = typeof obj[p] == "object" ? this.clone(obj[p]) : obj[p];
			newObj[p] = obj[p];
		}
		return newObj;
	}

	/**
	 * 批量赋值  obj0所有的值赋予给obj1   不影响obj1的其他属性和方法
	 */
	public static batchVest(obj0, obj1) {
		for (var p in obj0) {
			//obj1[p] = typeof obj0[p] == "object" ? this.clone(obj0[p]) : obj0[p];
			obj1[p] = obj0[p];
		}
	}


	/**
	 * 复制数组  只是重新建立引用
	 */
	public static copyArr(arr: Array<any>): Array<any> {
		var arr1: Array<any> = new Array<any>();
		for (var i: number = 0; i < arr.length; i++) {
			arr1.push(arr[i]);
		}
		return arr1;
	}
	

}