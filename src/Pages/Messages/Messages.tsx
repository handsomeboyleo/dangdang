import { List ,Image} from 'antd-mobile';
import React, { FC } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {selectChatAction} from "../../Redux/actions";

const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
`
const users = [
        {
                avatar:
                    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
                name: 'Novalee Spicer',
                description: 'Deserunt dolor ea eaque eos',
        },
        {
                avatar:
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
                name: 'Sara Koivisto',
                description: 'Animi eius expedita, explicabo',
        },
        {
                avatar:
                    'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
                name: 'Marco Gregg',
                description: 'Ab animi cumque eveniet ex harum nam odio omnis',
        },
        {
                avatar:
                    'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
                name: 'Edith Koenig',
                description: 'Commodi earum exercitationem id numquam vitae',
        },
]
const Messages: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onChat = (user:any) => {
        dispatch(selectChatAction(user))
        navigate('/chat')
    }
    return <MessageContainer >
        <List header='用户列表'>
            {users.map(user => (
                <List.Item
                    key={user.name}
                    onClick={()=>onChat(user)}
                    prefix={
                        <Image
                            src={user.avatar}
                            style={{ borderRadius: 25 }}
                            fit='cover'
                            width={50}
                            height={50}
                        />
                    }
                    description={user.description}
                >
                    {user.name}
                </List.Item>
            ))}
        </List>
    </MessageContainer>}
;
export default Messages