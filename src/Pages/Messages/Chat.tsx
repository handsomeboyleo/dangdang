import {Input, List, NavBar, PullToRefresh} from 'antd-mobile';
import React, {FC, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useStoreSelector} from "../../Redux/selector";
import {PullStatus} from "antd-mobile/es/components/pull-to-refresh";
import {sleep} from "antd-mobile/es/utils/sleep";
import SingleMessage from "../../Components/SingleMessage";



const Chat: FC = () => {
    const navigate = useNavigate()
    const chatUser = useStoreSelector(state=>state.selectChat) || ''
    const back = () =>{
        navigate('/messages')
    }
    console.log(chatUser)
    const msg={
        from:'dxx',
        to:'cxsa',
        msg:'camiodvnma',
        type:'dsadfcdsa',
        time:'123123'
    }
    return <>
        <NavBar onBack={back} back={'返回'}>{
            (chatUser.name) as string
        }</NavBar>
        <SingleMessage user={chatUser} msg={msg}/>
        <SingleMessage user={chatUser} msg={msg}/>
        <SingleMessage user={chatUser} msg={msg}/>
        <SingleMessage user={chatUser} msg={msg}/>
        <Input />
    </>
}
export default Chat
