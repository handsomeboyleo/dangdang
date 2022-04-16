import { UserType } from './accountTypes';
import { MessageType } from '../Pages/Messages/type';

export type chatListType = UserType[]

export type NewMessageType = {
    totalUnRead: number,
    newMsgList: MessageType[]
}
