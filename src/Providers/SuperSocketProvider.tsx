import React, { FC, useEffect ,useMemo} from 'react';
import { useStoreSelector } from '../Redux/selector';
import { SuperSocket } from '../Utils/superSocket';

const SuperSocketProvider: FC = ({ children }) => {
  const authState = useStoreSelector((state) => state.authState);
  const ss = SuperSocket;
  const WsUrl = useMemo(() => {
    if (process.env.NODE_ENV === 'production') {
      return 'wss://handsomeboyleo.com/SuperSocket'
    }
    return 'ws://localhost:5050/SuperSocket'
  },[])
  useEffect(() => {
    ss.setConfig({
      user: authState.userInfo,
      wsURL: WsUrl
    }).init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default SuperSocketProvider;
