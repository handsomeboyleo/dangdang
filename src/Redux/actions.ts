import { UserType } from '../Types/accountTypes';
import { chatListType, NewMessageType } from '../Types/chatListTypes';

// 包含所有的action creator
export const routerUpdate = (route: {}) => ({ type: 'UPDATE_ROUTE', data: route });

export const detectLoginAction = (data: {
    userInfo: UserType,
    isLogin: boolean
}) => ({ type: 'AUTH_CHANGE', data });
// export const updateUserAction =  ()=> createAction()

export const selectChatAction = (data: UserType) => ({ type: 'SELECT_CHAT', data });

export const addChatList = (data: chatListType) => ({ type: 'ADD_CHAT', data });

export const newMessage = (data: NewMessageType) => ({ type: 'NEW_MSG', data });
