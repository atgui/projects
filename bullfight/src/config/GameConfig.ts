module config {
	export class GameConfig {
		public constructor() {
		}
		public serverList:Array<GameServerConfig>;
	}
	export class GameServerConfig{
		public constructor() {
		}
		public url:string;
		public prot:number;
	}
}