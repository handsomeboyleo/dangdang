export type UserType = {
    name:string;
    avatar:string;
    description:string;
}

export type MessageType = {
    type: string,
    from: string,
    to: string,
    time: string,
    msg: string,
}