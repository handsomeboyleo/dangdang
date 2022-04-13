import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getUserInfo, register } from '../../Api/account';
import { detectLoginAction } from '../../Redux/actions';
import { UserType } from '../../Types/accountTypes';
import CustomUploadButton from '../../Components/AvatorUpload';
import { AppConfig } from '../../config';

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
interface ResRegisterType extends UserType{}

interface RegisterProps{
    change: React.Dispatch<React.SetStateAction<boolean>>
}
const Register:FC <RegisterProps> = ({ change }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const onRegister = async () => {
    const data = {
      email: account,
      password,
      phoneNumber,
      name: userName,
      avatar,
      // id:'nfdiaushfefew',
      // name:'dingdingTest',
      // phoneNumber: 1234567890,
      // age:20,
      // gender:'male',
      // avatar:'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      // description:'我是测试一号'
    };

    await register<ResRegisterType>(data).then((res) => {
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
        navigate('/home', { replace: true });
      });
    }
  }, [dispatch, isLogin, navigate]);

  return (
    <StyledContainer>
      <CustomUploadButton onImg={setAvatar} />
      <Form layout="horizontal" style={{ marginTop: 20 }}>
        <Form.Item label="邮箱" required name="email">
          <Input placeholder="请输入email" value={account} onChange={setAccount} type="email" clearable />
        </Form.Item>
        <Form.Item label="密码" name="password" required>
          <Input placeholder="请输入密码" value={password} onChange={setPassword} clearable type="password" />
        </Form.Item>
        <Form.Item label="用户名">
          <Input clearable placeholder="xxx" value={userName} onChange={setUserName} />
        </Form.Item>
        <Form.Item label="手机号">
          <Input clearable placeholder="1234567890" value={phoneNumber} onChange={setPhoneNumber} type="tel" />
        </Form.Item>
      </Form>
      <StyledButtonArea>
        <Button block color="primary" shape="rounded" onClick={onRegister} disabled={!password || !account}>注册</Button>
        <Button block color="primary" shape="rounded" onClick={() => change(true)}>登陆</Button>
      </StyledButtonArea>
    </StyledContainer>

  );
};
export default Register;
