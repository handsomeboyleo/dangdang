export type MessageType = {
    id?: string;
    type: string,
    belong:string,
    send: string,
    receive: string,
    sendTime: string,
    msg: string,
    isRead?: boolean
}
export type OptionMessageType = {
    type: string,
    send: string,
    msg:string
}
