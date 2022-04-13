import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStoreSelector } from '../Redux/selector';
import { MessageType } from '../Pages/Messages/type';
import { newMessage } from '../Redux/actions';
import { SuperSocket } from './superSocket';

const SuperSocketProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const authState = useStoreSelector((state) => state.authState);
  const ss = SuperSocket;

  useEffect(() => {
    const ws = ss.init(authState.userInfo.id);
    ws.onmessage = async (e:MessageEvent) => {
      const message = JSON.parse(e.data) as MessageType;
      if (message.type === 'OPERATION') {
        console.log(message);
      } else if (message.type === 'MESSAGE') {
        dispatch(newMessage(message));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default SuperSocketProvider;
