module popup {
		/** 
		 * 弹窗指令类型枚举
		 */
	export enum PopupType {
		/**
		 * 打开后不关闭其他
		 */
		OPEN_NORMAL,
		/**
		 * 打开后关闭上一个
		 */
		OPEN_HIDE_PREV,
		/**
		 * 打开后关闭其他所有弹窗
		 */
		OPEN_HIDE_ALL,
		/**
		 * 关闭后不关闭其他
		 */
		CLOSE_NORMAL,
		/**
		 * 关闭所有弹窗
		 */
		CLOSE_ALL
	}
}