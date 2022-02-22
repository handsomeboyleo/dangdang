import { Image,  Button } from 'antd-mobile';
import  React, { FC } from 'react';
import { useStoreSelector } from '../../Redux/selector';

const UserCenter: FC = () => {
    const select = useStoreSelector(state => state.authState)
    const userInfo = select && select.userInfo
    const signOut = async() => {
    }
    return <div>
        <Image
            src={userInfo.avatar||'/404'}
            width={64}
            height={64}
            fit='cover'
            style={{ borderRadius: 32 }} />
        
        <div>{userInfo.name}</div>
            <Button block onClick={signOut} >退出登陆</Button>
    </div>
}
export default UserCenter