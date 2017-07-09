module common {
	export class VipSys extends GameDispatcher {
		public constructor() {
			super();
			this.countTime = 1;
			this._isCanGet=false;
			TimeManager.instance.addSecondFun(this._secondTimeRun, this);
		}

		/**
		 * 倒计时长
		 */

		public get countTime(): number {
			return this._countTime;
		}
		public set countTime(value: number) {
			this._countTime = value;
		}
		private _countTime: number;

		/**
		 * 是否能领取
		 */
		private _isCanGet:boolean

		private _secondTimeRun() {
			if (this._countTime >1) {
				this._countTime -= 1;
			}
			this.dispatchEvent(new GameEvent(GameEvent.CHANGING, this.countTime));
		}


		/**
		 * 能够领取了
		 */
		public canGet() {
			this._isCanGet=true;
			this._countTime = 0;
			this.dispatchEvent(new GameEvent(GameEvent.CHANGING, this.countTime));
		}
	}
}