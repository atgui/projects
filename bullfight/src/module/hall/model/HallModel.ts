module hall {
	export class HallModel extends GameDispatcher {
		public constructor() {
			super();
		}


		/**
		 * 进入的游戏
		 */

		public get joinGameName(): string {
			return this._joinGameName;
		}

		public set joinGameName(value: string) {
			this._joinGameName = value;
			this.dispatchEvent(new GameEvent(hall.HallCMD.HALL_INTOGAME))
		}
		private _joinGameName: string;
	}



}