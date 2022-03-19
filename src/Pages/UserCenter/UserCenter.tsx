import React, { FC } from 'react';
import { Button, Image } from 'antd-mobile';

import styled from 'styled-components';
import { useStoreSelector } from '../../Redux/selector';
import { onSignOut } from '../../Redux/actions';

const UserInfoContainer = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  height:200px
`;

const UserCenter: FC = () => {
  const select = useStoreSelector((state) => state.authState);
  const userInfo = select && select.userInfo;
  const signOut = async () => {
    onSignOut();
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
    }}
    >
      <UserInfoContainer style={{ }}>
        <Image
          src={userInfo.avatar || '/404'}
          width={76}
          height={76}
          fit="cover"
          style={{ borderRadius: 38 }}
        />
        <div style={{ alignSelf: 'center' }}>{userInfo.name}</div>
      </UserInfoContainer>
      <Button color="danger" block onClick={signOut}>退出登陆</Button>
    </div>
  );
};
export default UserCenter;
