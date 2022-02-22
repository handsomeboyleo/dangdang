import React, {FC} from 'react'
import { Image, List } from 'antd-mobile';
import { fakeMsgs } from '../../Utils/fakeData';
import { selectChatAction, addChatList } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStoreSelector } from '../../Redux/selector';
import { UserType } from '../../Types/accountTypes';

const Contact: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const chatList = useStoreSelector(state => state.chatList)
  
  const users = [
    {
        id:'xdsafe',
    avatar:
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Novalee Spicer',
    description: 'Deserunt dolor ea eaque eos',
  },
    {
        id:'xdsafe',
    avatar:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    name: 'Sara Koivisto',
    description: 'Animi eius expedita, explicabo',
  },
  {
        id:'xdsafe',
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Marco Gregg',
    description: 'Ab animi cumque eveniet ex harum nam odio omnis',
  },
  {
        id:'xdsafe',
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'Edith Koenig',
    description: 'Commodi earum exercitationem id numquam vitae',
  },
  ]
  const onSelectUser = (user: UserType) => {
     chatList.push(user)
    fakeMsgs(user)
    dispatch(selectChatAction(user))
    dispatch(addChatList(chatList))
    navigate('/chat')
  }
    return <List header='用户列表'>
      {users.map(user => (
        <List.Item
          key={user.name}
          onClick={()=>onSelectUser(user)}
          prefix={
            <Image
              src={user.avatar}
              style={{ borderRadius: 20 }}
              fit='cover'
              width={40}
              height={40}
            />
          }
          description={user.description}
        >
          {user.name}
        </List.Item>
      ))}
    </List>
}
export default Contact