import { AppConfig } from '../config';
import { MessageType } from '../Pages/Messages/type';
import { UserType } from '../Types/accountTypes';
import { chatListType } from '../Types/chatListTypes';
import { superSocket } from '../Utils/superSocket';
import store from './store';

// 包含所有的action creator
export const routerUpdate = (route: {}) => ({ type: 'UPDATE_ROUTE', data: route });

export const detectLoginAction = (data: {
    userInfo: UserType,
    isLogin: boolean
}) => ({ type: 'AUTH_CHANGE', data });
// export const updateUserAction =  ()=> createAction()

export const selectChatAction = (data: UserType) => ({ type: 'SELECT_CHAT', data });

export const addChatList = (data: chatListType) => ({ type: 'ADD_CHAT', data });

export const newMessage = (data: MessageType) => ({ type: 'NEW_MSG', data });

/**
 *
 * @returns
 */
export const onSignOut = () => {
  const ws = superSocket.socket;
  AppConfig.set('token', '');
  localStorage.removeItem('token');
  ws.close();
  store.dispatch(detectLoginAction({ isLogin: false, userInfo: {} as UserType }));
};
