import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input} from 'antd-mobile';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {getUserInfo, signIn, tokenSignIn} from '../../Api/account';
import {detectLoginAction} from '../../Redux/actions';
import {AppConfig} from '../../config';
import {UserType} from '../../Types/accountTypes';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  background-color: #FFFFFF
`;

const StyledButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 50px 10px;
  height: 200px;
`;

const TokenSignIn: FC = ({children}) => {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const onTokenLogin = async () => {
    await tokenSignIn().then((res) => {
      if (res.code === 200) {
        dispatch(detectLoginAction({
          isLogin: true,
          userInfo: res.data as UserType,
        }));
      }
    });
  };
  useEffect(() => {
    if (token) {
      AppConfig.set('token', token);
      onTokenLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

interface SignInProps {
  change: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn: FC<SignInProps> = ({change}) => {
  const dispatch = useDispatch();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const onSignIn = async () => {
    const data = {
      email: account,
      password,
    };
    await signIn(data).then((res) => {
      if (res.code === 200) {
        // @ts-ignore
        AppConfig.set('token', res.data.token);
        setIsLogin(true);
      }
    });
  };
  useEffect(() => {
    if (isLogin) {
      getUserInfo().then((res) => {
        dispatch(detectLoginAction({
          isLogin: true,
          userInfo: res.data as UserType,
        }));
      });
    }
  }, [dispatch, isLogin]);
  return (
      <TokenSignIn>
        <StyledContainer>
          <Form layout="horizontal">
            <Form.Item label="用户名" name="username">
              <Input placeholder="请输入用户名" value={account} onChange={setAccount} clearable/>
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input placeholder="请输入密码" value={password} onChange={setPassword} clearable type="password"/>
            </Form.Item>
          </Form>
          <StyledButtonArea>
            <Button disabled={!password || !account} shape="rounded" block color="primary" onClick={onSignIn}>
              登陆
            </Button>
            <Button block shape="rounded" onClick={() => change(false)} color="primary">
              注册
            </Button>
          </StyledButtonArea>
        </StyledContainer>
      </TokenSignIn>
  );
};

export default SignIn;
