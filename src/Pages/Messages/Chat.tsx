import React, {FC, useEffect, useState} from 'react'
import {Button, NavBar, TextArea,} from 'antd-mobile';
import {useNavigate} from "react-router-dom";
import {useStoreSelector} from "../../Redux/selector";
import SingleMessage from "../../Components/SingleMessage";
import styled from "styled-components";
import {MessageType} from "./type";
import {superSocket} from "../../Utils/superSocket";

const StyledChatContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const StyledScroll= styled.div`
  flex: 1;
  overflow: auto;
`;
const StyledTextArea= styled.div`
  position: absolute;
  bottom: 0;
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
const StyledSendButton= styled(Button)`
  width:100px;
  height:50px;
`;

const Chat: FC = () => {
    const navigate = useNavigate()
    const ws = superSocket.socket
    const [value, setValue] = useState('');
    const chatUser = useStoreSelector(state=>state.selectChat)
    const userChat =JSON.parse(localStorage.getItem(`CHAT_${chatUser.name}`) || '')

    useEffect(() => {
        let dialog = document.getElementById("dialog");
        if(dialog){
            dialog.scrollTop = dialog.scrollHeight;
        }
    }, []);

    const sendMsg = ()=>{
        const data = {
            user: 'dingding',
            msg: value,
            target: 'dingding',
        };
        ws.send(JSON.stringify(data));
        setValue('')
    }

    const back = () =>{
        navigate('/messages')
    }

    return <StyledChatContainer>
        <NavBar onBack={back} back={'返回'}>{
            chatUser.name
        }</NavBar>
        <StyledScroll id="dialog">
            {
                userChat&&(userChat as MessageType[]).map((item,idx) => {
                    return <SingleMessage key={idx} user={chatUser} msg={item}/>
                })
            }
        </StyledScroll>
        <StyledTextArea>
            <TextArea
                placeholder='说点什么吧...'
                value={value}
                onChange={val => {
                    setValue(val)
                }}
                autoSize={{ minRows: 1, maxRows: 4}}
            />
            <StyledSendButton
                color={'success'}
                block
                onClick={sendMsg}
            >发送</StyledSendButton>
        </StyledTextArea>
    </StyledChatContainer>
}
export default Chat
