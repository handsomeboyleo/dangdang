import React, { FC } from 'react';
import { Button, Image } from 'antd-mobile';
import { useDispatch } from 'react-redux';

import { useStoreSelector } from '../../Redux/selector';
import { AppConfig } from '../../config';
import { detectLoginAction } from '../../Redux/actions';
import { UserType } from '../../Types/accountTypes';
import { superSocket } from '../../Utils/superSocket';

const UserCenter: FC = () => {
  const dispatch = useDispatch();
  const select = useStoreSelector((state) => state.authState);
  const ws = superSocket.socket;
  const userInfo = select && select.userInfo;
  const signOut = async () => {
    AppConfig.set('token', '');
    localStorage.removeItem('token');
    ws.close();
    dispatch(detectLoginAction({ isLogin: false, userInfo: {} as UserType }));
  };
  return (
    <div>
      <Image
        src={userInfo.avatar || '/404'}
        width={64}
        height={64}
        fit="cover"
        style={{ borderRadius: 32 }}
      />
      <div>{userInfo.name}</div>
      <Button block onClick={signOut}>退出登陆</Button>
    </div>
  );
};
export default UserCenter;
