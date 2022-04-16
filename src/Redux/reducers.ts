// 包含n个reducer函数的模块
import {combineReducers} from 'redux';
import {ActionTypes} from './actionType';

const routerInfo = (state = {route: {}}, action: ActionTypes) => {
  switch (action.type) {
    case 'UPDATE_ROUTE':
      return action.data;
    default:
      return state;
  }
};
const headerInfo = (state = {}, action: ActionTypes) => {
  switch (action.type) {
    case 'SET_HEADER':
      return action.data;
    default:
      return state;
  }
};
const authState = (state = {isLogin: false}, action: ActionTypes) => {
  switch (action.type) {
    case 'AUTH_CHANGE':
      localStorage.setItem('isLogin', JSON.stringify(action.data));
      return action.data;
    default:
      return state;
  }
};
const selectChat = (state = {}, action: ActionTypes) => {
  switch (action.type) {
    case 'SELECT_CHAT':
      return action.data;
    default:
      return state;
  }
};
const chatList = (state = [], action: ActionTypes) => {
  switch (action.type) {
    case 'ADD_CHAT':
      return action.data;
    default:
      return state;
  }
};
const newMessages = (state = {totalUnRead: 0, newMsgList: []}, action: ActionTypes) => {
  switch (action.type) {
    case 'NEW_MSG':
      return {
        totalUnread: 0, // state.totalUnRead + 1,
        newMsgList: [...state.newMsgList, action.data],
      };
    default:
      return state;
  }
};
export const finalReducer = combineReducers({
  routerInfo,
  authState,
  selectChat,
  chatList,
  headerInfo,
  newMessages,
});
