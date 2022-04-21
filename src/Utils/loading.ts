import React from 'react';
import { Toast } from 'antd-mobile';

class Loading {
  private status: boolean | any;

  /**
   * @description 打开全局loading
   * @param  content : React.ReactNode loading显示文字区域;
   * @returns Toast.show({})
   */
  show(content?: React.ReactNode) {
    this.status = true;
    Toast.show({
      icon: 'loading',
      content: content || '加载中',
      duration: 0,
      maskClickable: false,
    });
  }

  /**
   * @description 关闭所有loading
   * @returns Toast.clear()
   */
  close() {
    this.status = false;

    Toast.clear();
  }
}
/**
 * @description 全局loading
 */
const loading = new Loading();

export default loading;
