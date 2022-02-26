import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../Redux/selector';
import { superSocket } from './superSocket';
import { wsBaseUrl } from '../config';
import { MessageType } from '../Pages/Messages/type';
import { newMessage } from '../Redux/actions';
import { NewMessageType } from '../Types/chatListTypes';

const SuperSocketProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const authState = useStoreSelector((state) => state.authState);
  const msg = useStoreSelector((state) => state.newMessages);
  const ss = superSocket;
  const ws = ss.init(wsBaseUrl + authState.userInfo.id);
  if (ws) {
    ws.onopen = () => {
      console.info(`%c-- ${authState.userInfo.name} websocket connected --`, 'color:green');
    };
    ws.onclose = () => {
      console.warn('ws连接已断开！');
    };
    ws.onerror = () => {
      console.warn('ws连接异常！');
    };
    ws.onmessage = async (e) => {
      const message = JSON.parse(e.data) as MessageType;
      const params = {
        totalUnRead: msg.totalUnRead + 1,
        newMsgList: [...msg.newMsgList, message],
      } as NewMessageType;
      if (message.type === 'OPERATION') {
        console.log(message);
      } else {
        dispatch(newMessage(params));
      }
    };
  } else {
    ss.init(wsBaseUrl + authState.userInfo.id);
  }

  return <>{children}</>;
};

export default SuperSocketProvider;
