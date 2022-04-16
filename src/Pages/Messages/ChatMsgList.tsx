import React, {
  useEffect, FC, useMemo,
} from 'react';
import styled from 'styled-components';
import SingleMessage from '../../Components/SingleMessage';
import {UserType} from '../../Types/accountTypes';
// import { MessageType } from './type';
import {useStoreSelector} from '../../Redux/selector';
import {NewMessageType} from '../../Types/chatListTypes';
import {MessageType} from './type';

const StyledScroll = styled.div`
  flex: 1;
  overflow: auto;
  padding-bottom: 5px;
`;

interface ChatMsgListType {
  currentChatUser: UserType,
  authUser: UserType,
  initMsgList: MessageType[]
}

const ChatMsgList: FC<ChatMsgListType> = ({authUser, currentChatUser, initMsgList}) => {
  const {newMsgList} = useStoreSelector((state) => state.newMessages) as NewMessageType;
  const newMessageList = newMsgList.filter((i) => i.belong === `${authUser.name}${currentChatUser.name}` || i.belong === `${currentChatUser.name}${authUser.name}`);
  const bindList = useMemo(() => [...initMsgList, ...newMessageList], [initMsgList, newMessageList]);
  const messageList = useMemo(() => bindList.filter((item, idx) => bindList.findIndex((tmsg) => tmsg.id === item.id) === idx), [bindList]).sort((a, b) => parseInt(a.sendTime, 10) - parseInt(b.sendTime, 10));

  useEffect(() => {
    const dialog = document.getElementById('dialog');
    if (dialog) {
      dialog.scrollTop = dialog.scrollHeight;
    }
  }, [messageList]);
  //   const [msgList, setMsgList] = useState<MessageType[]>([]);
  return (
      <StyledScroll id="dialog">
        {
          messageList.map((item) => (
              <SingleMessage
                  key={item.id}
                  user={authUser}
                  chatUser={currentChatUser}
                  msg={item}
              />
          ))
        }
      </StyledScroll>
  );
};

export default ChatMsgList;
