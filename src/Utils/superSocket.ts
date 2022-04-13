import { Toast } from 'antd-mobile';

const WsStatus = {
  /**
   * 断线
   */
  OFF: 'OFF',
  /**
   * 就绪
   */
  READY: 'READY',
  /**
   * 重新连接中
   */
  RECONNECTING: 'RECONNECTING',
};

/**
 * @description SuperSocket实例
 */
class Socket {
  /**
   * websocket实例
   * @private
   */
  private _socket: WebSocket | any;

  /**
   * SuperSocket连接Id
   * @private
   */
  private _wsId: string | any;

  /**
   * SuperSocket状态
   */
  public status: string | undefined;

  /**
   * 生成superSocket通信
   * @param userId:string userId
   * @param protocols?:string
   */
  init(userId: string, protocols?: string | string[] | undefined) {
    if (this.status !== WsStatus.READY) {
      if (!this._wsId) {
        // 防止重连时多次重置
        this._wsId = userId;
      }
      const url = `${process.env.REACT_APP_WS_BASE_URL}?${userId}`;
      const ws = new WebSocket(url, protocols);

      ws.onopen = () => {
        this.status = WsStatus.READY;
        const timer = setInterval(() => {
          if (ws.readyState === 1) {
            ws.send(JSON.stringify({
              type: 'HEARTBEAT',
              send: userId,
              msg: 'heartbeat',
            }));
          } else {
            clearInterval(timer);
          }
        }, 30000);
        console.info(`%c-- ${userId} websocket connected --`, 'color:green');
      };
      ws.onclose = () => {
        if (this.status !== WsStatus.RECONNECTING && this.status !== WsStatus.OFF) {
          this.reconnect();
        }
        console.warn('ws连接已断开！');
      };
      ws.onerror = () => {
        console.warn('ws连接异常！');
      };
      return this._socket = ws;
    }
    console.log('socket 已经存在了', this._socket);
    return this._socket as WebSocket;
  }

  /**
   * 重新连接
   */
  reconnect() {
    this.status = WsStatus.RECONNECTING;
    Toast.show({
      content: '断线重连中...',
      icon: 'loading',
      maskClickable: false,
      duration: 0,
    });
    const timer = setInterval(() => {
      if (this.status === WsStatus.READY) {
        Toast.clear();
        clearInterval(timer);
      } else {
        this.init(this._wsId);
      }
    }, 3000);
  }

  /**
   * 断开连接
   */
  close() {
    this.status = WsStatus.OFF;
    this._socket.close();
  }

  /**
   * 生成的websocket
   */
  get socket() {
    return this._socket as WebSocket;
  }
}
export const SuperSocket = new Socket();
