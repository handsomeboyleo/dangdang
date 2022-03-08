import React, { FC, useEffect, useState } from 'react';
import { Button, NavBar, TextArea } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useStoreSelector } from '../../Redux/selector';
import SingleMessage from '../../Components/SingleMessage';
import { MessageType } from './type';
import { superSocket } from '../../Utils/superSocket';
import { getUserChat, sendMessage } from '../../API/chat';

const StyledChatContainer = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
`;
const StyledScroll = styled.div`
  flex: 1;
  overflow: auto;
  padding-bottom: 5px;
`;
const StyledTextArea = styled.div`
  width:100%;
  max-height: 100px;
  min-height:25px;
  padding: 5px 0;
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  border-top:1px solid lightgrey;
  background-color: #FFFFFF;
`;
const StyledSendButton = styled(Button)`
  width:100px;
  height:50px;
`;

const Chat: FC = () => {
  const navigate = useNavigate();
  const ws = superSocket.socket;
  const chatUser = useStoreSelector((state) => state.selectChat);
  // const localMsgs = localStorage.getItem(`CHAT_${chatUser.name}`);
  // const localChat = localMsgs && JSON.parse(localMsgs) as MessageType[];
  const [value, setValue] = useState('');
  const [msgList, setMsgList] = useState<MessageType[]>([]);
  const auth = useStoreSelector((state) => state.authState);
  const scrollToBottom = () => {
    const dialog = document.getElementById('dialog');
    if (dialog) {
      dialog.scrollTop = dialog.scrollHeight;
    }
  };

  const getMsg = async () => {
    await getUserChat({
      send: auth.userInfo.name,
      receive: chatUser.name,
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
    console.log(msg);
    ws.send(JSON.stringify(msg));
    await sendMessage(msg);
    setMsgList([...msgList, msg]);
    scrollToBottom();
    setValue('');
  };

  const back = () => {
    // localStorage.setItem(`CHAT_${chatUser.name}`, JSON.stringify(msgList));
    navigate('/messages');
  };
  // const handleKeyDown = async (e:React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.keyCode === 13) {
  //     await sendMsg();
  //   }
  // };
  useEffect(() => {
    getMsg();
    const dialog = document.getElementById('dialog');
    if (dialog) {
      dialog.scrollTop = dialog.scrollHeight;
    }
  }, []);
  useEffect(() => {
    if (ws) {
      ws.onmessage = async (msg) => {
        const message = JSON.parse(msg.data) as MessageType;
        if (message.type === 'MESSAGE') {
          setMsgList([...msgList, message]);
          console.log(msgList);
          scrollToBottom();
        }
      };
    }
  }, []);
  return (
    <StyledChatContainer id="container">
      <NavBar onBack={back} back="返回">
        {
            chatUser.name
        }
      </NavBar>
      <StyledScroll id="dialog">
        {
          // eslint-disable-next-line react/no-array-index-key
          msgList.map((item, idx) => <SingleMessage key={idx} user={auth.userInfo} chatUser={chatUser} msg={item} />)
        }
      </StyledScroll>
      <StyledTextArea>
        <TextArea
          placeholder="说点什么吧..."
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
        <StyledSendButton
          color="success"
          block
          onClick={sendMsg}
        >
          发送
        </StyledSendButton>
      </StyledTextArea>
    </StyledChatContainer>
  );
};
export default Chat;
