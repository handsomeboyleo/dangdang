class Socket {
  private _socket: WebSocket | any;

  init(url: string | URL, protocols?: string | string[] | undefined) {
    if (this._socket && this._socket.readyState === 1) {
      console.log('socket 已经存在了', this._socket);
      return this._socket as WebSocket;
    }
    return this._socket = new WebSocket(url, protocols);
  }

  get socket() {
    return this._socket as WebSocket;
  }
}

export const superSocket = new Socket();
