import { Image, List } from 'antd-mobile';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectChatAction } from '../../Redux/actions';
import { useStoreSelector } from '../../Redux/selector';
import { chatListType } from '../../Types/chatListTypes';
import { UserType } from '../../Types/accountTypes';

const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
`;

const Messages: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeChatList = useStoreSelector((state) => state.chatList) as chatListType;

  const chatList = useMemo(() => storeChatList.filter((item, idx) => storeChatList.findIndex((chat) => chat.id === item.id) === idx), [storeChatList]);

  const onChat = (user: UserType) => {
    dispatch(selectChatAction(user));
    navigate('/chat');
  };
  return (
    <MessageContainer>
      <List header="最近聊天">
        {chatList.map((user) => (
          <List.Item
            key={user.name}
            onClick={() => onChat(user)}
            prefix={(
              <Image
                src={user.avatar || ''}
                style={{ borderRadius: 25 }}
                fit="cover"
                width={50}
                height={50}
              />
                      )}
            description={user.description}
          >
            {user.name}
          </List.Item>
        ))}
      </List>
    </MessageContainer>
  );
};
export default Messages;
