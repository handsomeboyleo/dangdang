import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Toast } from 'antd-mobile';
import { useStoreSelector } from '../Redux/selector';
import { superSocket } from './superSocket';
import { wsBaseUrl } from '../config';
import { MessageType } from '../Pages/Messages/type';
import { newMessage } from '../Redux/actions';
import { NewMessageType } from '../Types/chatListTypes';

const SuperSocketProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [wsState, setWsState] = useState(false);
  const authState = useStoreSelector((state) => state.authState);
  const msg = useStoreSelector((state) => state.newMessages);
  const ss = superSocket;

  const reconnect = () => {
    if (wsState) return;
    console.log('重连失败');
    setWsState(true);
    setTimeout(() => {
      createSuperSocket();
      setWsState(false);
    }, 3000);
  };

  // // eslint-disable-next-line no-undef
  // const heartBeat = useCallback((wss:WebSocket, timer:NodeJS.Timeout) => {
  //   if (wsState) {
  //     wss.send(JSON.stringify({
  //       type: 'HEARTBEAT',
  //       send: authState.userInfo.id,
  //       msg: 'heartbeat',
  //     }));
  //   } else {
  //     clearInterval(timer);
  //   }
  // }, [wsState, authState]);

  const createSuperSocket = useCallback(
    () => {
      if (!wsState) {
        const ws = ss.init(wsBaseUrl + authState.userInfo.id);
        ws.onopen = () => {
          setWsState(true);
          Toast.clear();
          const timer = setInterval(() => {
            if (ws.readyState === 1) {
              ws.send(JSON.stringify({
                type: 'HEARTBEAT',
                send: authState.userInfo.id,
                msg: 'heartbeat',
              }));
            } else {
              clearInterval(timer);
            }
          }, 30000);

          console.info(`%c-- ${authState.userInfo.name} websocket connected --`, 'color:green');
        };
        ws.onclose = () => {
          reconnect();
          Toast.show({
            content: '断线重连中...',
            icon: 'loading',
            maskClickable: false,
            duration: 0,
          });
          console.warn('ws连接已断开！');
        };
        ws.onerror = () => {
          // reconnect();
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
      }
    },
    [],
  );

  useEffect(() => {
    createSuperSocket();
  }, [createSuperSocket]);

  return <>{children}</>;
};

export default SuperSocketProvider;
