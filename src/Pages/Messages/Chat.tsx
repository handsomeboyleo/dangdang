import React, {FC, useEffect, useState} from 'react'
import {Button, NavBar, TextArea,} from 'antd-mobile';
import {useNavigate} from "react-router-dom";
import {useStoreSelector} from "../../Redux/selector";
import SingleMessage from "../../Components/SingleMessage";
import styled from "styled-components";
import {MessageType} from "./type";
import {superSocket} from "../../Utils/superSocket";
import {sendMessage} from "../../API/chat";

const StyledChatContainer = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
`;
const StyledScroll= styled.div`
  flex: 1;
  overflow: auto;
  padding-bottom: 5px;
`;
const StyledTextArea= styled.div`
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
    const chatUser = useStoreSelector(state=>state.selectChat)
    const localChat =JSON.parse(localStorage.getItem(`CHAT_${chatUser.name}`) || '') as MessageType[]
    const [value, setValue] = useState('');
    const [msgList,setMsgList] = useState<MessageType[]>(localChat)
    const auth = useStoreSelector(state => state.authState)
    useEffect(() => {
        let dialog = document.getElementById("dialog");

        if(dialog){
            dialog.scrollTop = dialog.scrollHeight;
        }
    }, []);

    const sendMsg = async ()=>{
        const now = new Date()
        const data = {
            user: 'dingding',
            msg: value,
            target: 'dingding',
        };
        const msg = {
            id: auth.userInfo._id+ now.getTime(),
            type:'MESSAGE',
            send: auth.userInfo._id,
            receive: chatUser.id,
            msg:value,
            sendTime: `${Date}`,
            isRead:false
        }
        ws.send(JSON.stringify(data));
        await sendMessage(msg);
        setMsgList([...msgList,msg]) 
        console.log(msgList)
        scrollToBottom()
        setValue('')
    }
    const scrollToBottom = () => {
        let dialog = document.getElementById("dialog");

        if(dialog){
            dialog.scrollTop = dialog.scrollHeight;
        }
    }
    const back = () => {
        localStorage.setItem(`CHAT_${chatUser.name}`, JSON.stringify(msgList))
        navigate('/messages')
    }

    return <StyledChatContainer id={'container'}>
        <NavBar onBack={back} back={'返回'}>{
            chatUser.name
        }</NavBar>
        <StyledScroll id="dialog">
            {
                msgList.map((item,idx) => {
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
