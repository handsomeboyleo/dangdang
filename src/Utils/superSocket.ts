import { MessageType } from '../Pages/Messages/type';
import { newMessage } from '../Redux/actions';
import store from '../Redux/store';
import loading from './loading';
import { UserType } from '../Types/accountTypes';

interface SuperSocketConfigType {
  user: UserType;
  wsURL: string
}

// eslint-disable-next-line no-shadow
enum SuperSocketStatus {
  /**
   * 断线
   */
  OFF = 'OFF',
  /**
   * 就绪
   */
  READY = 'READY',
  /**
   * 重新连接中
   */
  RECONNECTING = 'RECONNECTING',
}

class Socket {
  /**
   * websocket实例
   * @private
   */
  private _socket: WebSocket | any;

  /**
   * SuperSocket用户
   * @private
   */
  private _socketUser: UserType | any;

  /**
   * wsURL
   * @private
   */
  private _wsURL: string | any;

  /**
   * SuperSocket状态
   */
  status: SuperSocketStatus | undefined;

  /**
   * @description 设置socket用户
   * @param config SuperSocketConfigType
   * @returns SuperSocket
   */
  setConfig(config:SuperSocketConfigType) {
    this._socketUser = config.user;
    this._wsURL = config.wsURL;
    return this;
  }

  /**
   * 生成superSocket通信
   * @param protocols?:string
   */
  init(protocols?: string | string[] | undefined) {
    if (this.status !== SuperSocketStatus.READY) {
      const url = `${this._wsURL}?${this._socketUser.id}`;
      // const url = `${process.env.REACT_APP_WS_BASE_URL}?${this._socketUser.id}`;
      const ws = new WebSocket(url, protocols);

      ws.onopen = () => {
        this.status = SuperSocketStatus.READY;
        const timer = setInterval(() => {
          if (ws.readyState === 1) {
            ws.send(JSON.stringify({
              type: 'HEARTBEAT',
              send: this._socketUser.id,
              msg: 'heartbeat',
            }));
          } else {
            clearInterval(timer);
          }
        }, 30000);
        console.info(`%c-- ${this._socketUser.name} websocket connected --`, 'color:green');
      };
      ws.onmessage = async (e: MessageEvent) => {
        const message = JSON.parse(e.data) as MessageType;
        if (message.type === 'OPERATION') {
          console.log(message);
        } else if (message.type === 'MESSAGE') {
          store.dispatch(newMessage(message));
        }
      };
      ws.onclose = () => {
        if (this.status !== SuperSocketStatus.RECONNECTING && this.status !== SuperSocketStatus.OFF) {
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
    this.status = SuperSocketStatus.RECONNECTING;
    loading.show('断线重连中...');
    const timer = setInterval(() => {
      if (this.status === SuperSocketStatus.READY) {
        loading.close();
        clearInterval(timer);
      } else {
        this.init();
      }
    }, 3000);
  }

  /**
   * 断开连接
   */
  close() {
    this.status = SuperSocketStatus.OFF;
    this._socket.close();
  }

  /**
   * 生成的websocket
   */
  get socket() {
    return this._socket as WebSocket;
  }
}

/**
 * @description SuperSocket实例
 */
export const SuperSocket = new Socket();
