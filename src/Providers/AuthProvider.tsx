import React, { FC } from 'react';
import { useStoreSelector } from '../Redux/selector';
import Authorization from '../Pages/Auth/Authorization';

const AuthProvider: FC = ({ children }) => {
  const localUserData = localStorage.getItem('isLogin');
  const isLogin = JSON.parse(localUserData || '{}');
  const authState = useStoreSelector((state) => state.authState);
  const checkWebAuth = isLogin && authState.isLogin;

  return (
    <>
      {checkWebAuth ? <>{children}</> : <Authorization />}
    </>
  );
};

export default AuthProvider;
