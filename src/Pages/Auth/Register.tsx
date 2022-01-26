import React, { FC, useState } from 'react';
import {Button, Form, Input } from 'antd-mobile';
interface RegisterProps{
    change: React.Dispatch<React.SetStateAction<boolean>>
}
const Register:FC <RegisterProps>= ({change}) =>{
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    return <Form layout='horizontal'>
        <Form.Item label='用户名' name='username'>
        <Input placeholder='请输入用户名' value={account} onChange={setAccount} clearable />
    </Form.Item>
    <Form.Item label='密码' name='password'>
        <Input placeholder='请输入密码' value={password} onChange={setPassword} clearable type='password' />
    </Form.Item>
        <Button>注册</Button>
        <Button onClick={()=>change(true)}>登陆</Button>
</Form>
}
export default Register