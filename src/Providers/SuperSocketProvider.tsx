import React, { FC, useEffect } from 'react';
import { useStoreSelector } from '../Redux/selector';
import { SuperSocket } from '../Utils/superSocket';

const SuperSocketProvider: FC = ({ children }) => {
  const authState = useStoreSelector((state) => state.authState);
  const ss = SuperSocket;

  useEffect(() => {
    ss.setConfig(authState.userInfo).init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default SuperSocketProvider;
