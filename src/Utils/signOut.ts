import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {detectLoginAction} from '../Redux/actions';
import {SuperSocket} from './superSocket';
import {AppConfig} from '../config';
import {UserType} from '../Types/accountTypes';

export const useSignOut = () => {
  const dispatch = useDispatch();
  const ws = SuperSocket;
  const doSignOut = useCallback(() => {
    AppConfig.set('token', '');
    localStorage.removeItem('token');
    ws.close();
    dispatch(detectLoginAction({isLogin: false, userInfo: {} as UserType}));
  }, [dispatch, ws]);

  return useMemo(() => ({
    doSignOut,
  }), [doSignOut]);
};
