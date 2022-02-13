export type UserType = {
    id:string;
    name?:string;
    email?:string;
    phoneNumber?:string;
    age?:number;
    gender?:string;
    avatar?:string;
    description?:string;
}

export type MessageType = {
    id:string;
    type: string,
    from: string,
    to: string,
    time: string,
    msg: string,
}