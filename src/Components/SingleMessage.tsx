import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {MessageType, UserType} from "../Pages/Messages/type";
import {Avatar } from "antd-mobile";

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
  font-weight: bold;
`;

const MsgBox = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  max-width: 50%;
`;

const MsgContent=styled.div`
  background-color: floralwhite;
  border-radius: 10px;
  min-height: 30px;
  line-height: 23px;
  text-align: left;
  margin-top: 5px;
  padding: 10px 12px;
  word-break: break-all;
  word-wrap: break-word;
`;

interface SingleMessageProps{
    user:UserType,
    msg:MessageType
}

const SingleMessage:FC<SingleMessageProps> =({user, msg})=>{
    const [right,setRight]= useState(false);
    const name= user.name
    useEffect(()=>{
        if (name === '') {
            setRight(true)
        }
    },[name])
    return <MsgContainer style={{flexDirection: `${right?'row-reverse':'row'}`}}>
        <MsgUser >
            <Avatar
                src={user.avatar||''}
                style={{ borderRadius: 25 }}
                fit='cover'
            />
        </MsgUser>
        <MsgBox >
            <MsgContent >{msg.msg }</MsgContent>
        </MsgBox>
    </MsgContainer>
}

export default SingleMessage