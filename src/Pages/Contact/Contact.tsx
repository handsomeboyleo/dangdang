import React, { FC, useEffect, useState } from 'react';
import { DotLoading, Image, List } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addChatList, selectChatAction } from '../../Redux/actions';
import { useStoreSelector } from '../../Redux/selector';
import { UserType } from '../../Types/accountTypes';
import { getAllUsers } from '../../Api/account';

const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Contact: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const chatList = useStoreSelector((state) => state.chatList);
  const auth = useStoreSelector((state) => state.authState);
  useEffect(() => {
    getAllUsers<UserType[]>().then((res) => {
      const list = res.data.filter((i) => i.id !== auth.userInfo.id);
      setUsers(list);
    }).finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSelectUser = (user: UserType) => {
    dispatch(selectChatAction(user));
    dispatch(addChatList([...chatList, user]));
    navigate('/chat');
  };
  return (
    <MessageContainer>
      <List header="用户列表">
        {
            loading ? <DotLoading color="primary" /> : users.length !== 0 && users.map((user) => (
              <List.Item
                key={user.name}
                onClick={() => onSelectUser(user)}
                prefix={(
                  <Image
                    src={user.avatar || ''}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={40}
                    height={40}
                  />
                    )}
                description={user.description}
              >
                {user.name}
              </List.Item>
            ))
          }
      </List>
    </MessageContainer>

  );
};

export default Contact;
