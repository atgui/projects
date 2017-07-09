module wanRenDouNiu {
	export class BullUpMasterSys {
		public constructor(view: WanRenDouNiuView) {
			this._view = view;
			this.build();
		}
		private _view: WanRenDouNiuView;
		private _topGroup: eui.Group;

		private _upBanckButton: eui.Image;

		private _zuserNameLabel: eui.Label;//庄家昵称
		private _zGoldLabel: eui.Label;//庄家金币
		private _zIcon: eui.Image;

		public build() {
			this._topGroup = this._view["topGroup"];
			this._upBanckButton = this._view["upBanckButton"];
			this._zuserNameLabel = this._view["zuserNameLabel"];
			this._zGoldLabel = this._view["zGoldLabel"];
			this._zIcon = this._view["zIcon"];

			this._bullUpMaster(null);

			var sp = new egret.Shape();
			sp.graphics.beginFill(0x000000);
			sp.graphics.drawCircle(this._zIcon.x + this._zIcon.width / 2, this._zIcon.y + this._zIcon.height / 2, 40);
			sp.graphics.endFill();
			this._topGroup.addChild(sp);

			this._zIcon.mask = sp;


			this.addEvent();
		}
		public addEvent() {
			this._upBanckButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchUpBanck, this);

			var bullModel = BullControl.instance.BullModel;
			bullModel.addEventListener(BullCMD.BULL_UP_MASTER, this._bullUpMaster, this);
			bullModel.addEventListener(BullCMD.BULL_MASTER_LIST, this._bullMasterList, this);
		}

		/**
		 * 请求上庄
		 */
		private _touchUpBanck(e: egret.TouchEvent) {
			BullControl.instance.send_bull_master_list();//先获取上庄列表
		}

		private _bullMasterList(e: GameEvent) {
			PopupManager.instance.addPop(new BullShangZhuangPopup());
		}

		//上庄返回
		private _bullUpMaster(e: GameEvent) {
			// var bimod = BullControl.instance.bimod;
			var gm = BullControl.instance.BullModel.gameMsters;
			var __self = this;

			//把庄家信息换了
			if (gm && gm["4"]) {
				this._zuserNameLabel.text = gm["4"];
				this._zGoldLabel.text = gm["5"];
				RES.getResByUrl(gm["6"], function (data) {
					__self._zIcon.texture = data;
				}, this, RES.ResourceItem.TYPE_IMAGE);
			} else {
				var arr = BullControl.instance.BullModel.mstersList;
				var obj: any = new Object();
				if (arr && arr.length > 0) {
					obj = arr[0];
					obj["6"] = "header_png";
				} else {
					obj["4"] = "系统";
					obj["5"] = "1.0亿";
					obj["6"] = "header_png";
				}
				this._zuserNameLabel.text = obj["4"];
				this._zGoldLabel.text = obj["5"];
				this._zIcon.texture = RES.getRes(obj["6"]);
			}
		}

		public removeEvent() {
			this._upBanckButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchUpBanck, this);

			var bullModel = BullControl.instance.BullModel;
			bullModel.removeEventListener(BullCMD.BULL_UP_MASTER, this._bullUpMaster, this);
			bullModel.removeEventListener(BullCMD.BULL_MASTER_LIST, this._bullMasterList, this);
		}
		public destroy() {
			this.removeEvent();
			this._view = null;
		}

	}
}