import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'antd-mobile';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signIn } from '../../API/account';
import { detectLoginAction } from '../../Redux/actions';

const StyledContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex: 1;
  justify-content: center;
  background-color:#FFFFFF
`;

const StyledButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-around;
  margin:50px 10px;
  height:200px;
`;

interface SignInProps{
    change: React.Dispatch<React.SetStateAction<boolean>>
}
const SignIn:FC<SignInProps> = ({ change }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const onSignIn = async () => {
    const data = {
      email: account,
      password,
    };
    await signIn(data).then((res) => {
      if (res.code === 200) {
        // @ts-ignore
        dispatch(detectLoginAction({ isLogin: true, userInfo: res.data }));
        navigate('/home', { replace: true });
      }
    });
  };
  const test = () => {
    dispatch(detectLoginAction({
      isLogin: true,
      userInfo: {
        id: 'xxxxx1',
        name: 'test',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        gender: 'male',
        age: 36,
        description: 'hello, Im robot',
      },
    }));
    navigate('/home', { replace: true });
  };
  return (
    <StyledContainer>
      <Form layout="horizontal">
        <Form.Item label="用户名" name="username">
          <Input placeholder="请输入用户名" value={account} onChange={setAccount} clearable />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input placeholder="请输入密码" value={password} onChange={setPassword} clearable type="password" />
        </Form.Item>
        <StyledButtonArea>
          <Button disabled={!password || !account} shape="rounded" block color="primary" onClick={onSignIn}>
            登陆
          </Button>
          <Button block shape="rounded" onClick={() => change(false)} color="primary">
            注册
          </Button>
          <Button block onClick={test}>测试</Button>
        </StyledButtonArea>
      </Form>
    </StyledContainer>
  );
};

export default SignIn;
