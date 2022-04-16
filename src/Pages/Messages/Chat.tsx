import React, {FC, useEffect, useState} from 'react';
import {
  Button, NavBar, TextArea, Toast,
} from 'antd-mobile';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {useDispatch} from 'react-redux';
import {useStoreSelector} from '../../Redux/selector';
import {SuperSocket} from '../../Utils/superSocket';
import {getUserChat, sendMessage} from '../../Api/chat';
import {newMessage} from '../../Redux/actions';
import ChatMsgList from './ChatMsgList';
import {UserType} from '../../Types/accountTypes';
import {MessageType} from './type';

const StyledChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.div`
  width: 100%;
  max-height: 100px;
  min-height: 25px;
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid lightgrey;
  background-color: #FFFFFF;
`;
const StyledSendButton = styled(Button)`
  width: 100px;
  height: 50px;
`;

const Chat: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [msgList, setMsgList] = useState<MessageType[]>([]);
  const chatUser = useStoreSelector((state) => state.selectChat);
  const auth = useStoreSelector((state) => state.authState);
  const ws = SuperSocket;
  const currentChatUser = chatUser.name;

  const getMsg = async () => {
    await getUserChat({
      send: auth.userInfo.name,
      receive: currentChatUser,
    }).then((res) => {
      if (res.code === 200) {
        setMsgList(res.data as MessageType[]);
      }
    });
  };

  const sendMsg = async () => {
    const nowTime = `${dayjs().valueOf()}`;
    const msg = {
      id: auth.userInfo.id + nowTime,
      type: 'MESSAGE',
      belong: `${auth.userInfo.name}${chatUser.name}`,
      send: auth.userInfo.id,
      receive: chatUser.id,
      msg: value,
      sendTime: nowTime,
      isRead: false,
    };
    if (ws.status !== 'READY') {
      Toast.show({
        content: '连接中断',
        icon: 'loading',
        maskClickable: true,
        duration: 1,
      });
    } else {
      ws.socket.send(JSON.stringify(msg));
      await sendMessage(msg);
      dispatch(newMessage(msg));
      setValue('');
    }
  };

  const back = () => {
    navigate('/messages');
  };

  useEffect(() => {
    getMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <StyledChatContainer id="container">
        <NavBar onBack={back} back="返回">
          {
            currentChatUser
          }
        </NavBar>
        <ChatMsgList
            authUser={auth.userInfo as UserType}
            currentChatUser={chatUser}
            initMsgList={msgList}
        />
        <StyledTextArea>
          <TextArea
              placeholder="说点什么吧..."
              value={value}
              onChange={setValue}
              autoSize={{minRows: 1, maxRows: 4}}
          />
          <StyledSendButton
              color="success"
              block
              onClick={sendMsg}
              disabled={value.length <= 0}
          >
            发送
          </StyledSendButton>
        </StyledTextArea>
      </StyledChatContainer>
  );
};
export default Chat;
