module anchor {
	export class AnchorRoomModel {

		public constructor(room:Array<any>) {
			this._room=new Object();
			for(var i:number=0;i<room.length;i++){
				this._room[room[i][0]]=room[i][2];
			}
		}

		private _room: any;
		/**
		 * id
		 */
		public get id(): string {
			return this._room.id;
		}
		/**
		 * 名字
		 */
		public get name(): string {
			return this._room.nickname;
		}

		/**
		 * 头像
		 */
		public get headUrl(): string {
			return this._room.portrait;
		}
		/**
		 * 照片
		 */
		public get photoUrl(): string {
			return this._room.temptation;
		}

		/**
		 * 流路径
		 */
		public get streamUrl(): string {
			return this._room.stream;
		}
	}
}