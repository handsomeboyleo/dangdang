class Socket {
    private _socket: WebSocket | any
    init(url: string | URL, protocols?: string | string[] | undefined) {
        if (this._socket) {
            console.warn('socket 已经存在了')
            return
        }
        return this._socket = new WebSocket(url, protocols)
    }
    get socket() {
        return this._socket as WebSocket
    }
}

export const superSocket = new Socket()