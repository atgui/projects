module common {
	export class AnimationSys {
		public constructor() {
			this._funs = new Array<{ func: Function, target: any, arg: any }>();
		}
		private _funs: Array<{ func: Function, target: any, arg: any }>;

		private _callObject: { func: Function, target: any };
		public get callObject(): { func: Function, target: any } {
			return this._callObject;
		}
		public set callObject(val: { func: Function, target: any }) {
			this._callObject = val;
		}

		public addFun(func: Function, target: any, args?: any) {
			this._funs.push({ func: func, target: target, arg: args });
		}
		public next() {
			var obj: { func: Function, target: any, arg: any } = this._funs.shift();
			if (obj) {
				obj.func.apply(obj.target, [obj.arg]);
				if (this._funs.length <= 0) {//没有下一个了
					if (this.callObject) {
						this.callObject.func.apply(this.callObject.target, [arguments]);
					}
				}
			} else {
				this._funs = new Array<{ func: Function, target: any, arg: any }>();
				if (this.callObject) {
					this.callObject.func.apply(this.callObject.target, [arguments]);
				}
			}
		}
	}
}