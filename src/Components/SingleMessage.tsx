import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd-mobile';
import { MessageType } from '../Pages/Messages/type';
import { UserType } from '../Types/accountTypes';

const MsgContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 5px;
`;

const MsgUser = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin: 5px 10px 5px 10px;
  line-height: 50px;
  text-align: center;
  color: white;
  box-shadow: 0px 0px 5px 1px lightgrey;
  font-weight: bold;
`;

const MsgBox = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  max-width: 60%;
`;

const MsgContent = styled.div`
  background-color: floralwhite;
  border-radius: 10px;
  min-height: 30px;
  line-height: 23px;
  text-align: left;
  margin-top: 5px;
  padding: 10px 12px;
  word-break: break-all;
  word-wrap: break-word;
  box-shadow: 1px 1px 5px 3px lightgrey;
`;

interface SingleMessageProps {
    chatUser: UserType,
    user: UserType,
    msg: MessageType
}

const SingleMessage: FC<SingleMessageProps> = ({ chatUser, user, msg }) => (
  <MsgContainer style={{ flexDirection: `${msg.send === user.id ? 'row-reverse' : 'row'}` }}>
    <MsgUser>
      <Avatar
        src={msg.send === user.id ? user.avatar : chatUser.avatar}
        style={{ borderRadius: 25 }}
        fit="cover"
      />
    </MsgUser>
    <MsgBox>
      <MsgContent>{msg.msg}</MsgContent>
    </MsgBox>
  </MsgContainer>
);

export default SingleMessage;
