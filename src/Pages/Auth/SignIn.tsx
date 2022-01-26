import React, {FC, useState} from "react";
import {Button, Form, Input} from "antd-mobile";
import {detectLoginAction} from "../../Store/actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
interface SignInProps{
    change:  React.Dispatch<React.SetStateAction<boolean>>
}
const SignIn:FC<SignInProps> =({change})=>{
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const signIn=()=>{
        console.log(account,password)
        dispatch(detectLoginAction({onLogin:true}))
        navigate('/home', {replace: true})
    }
    return <Form layout='horizontal'>
        <Form.Item label='用户名' name='username'>
            <Input placeholder='请输入用户名' value={account} onChange={setAccount} clearable />
        </Form.Item>
        <Form.Item label='密码' name='password'>
            <Input placeholder='请输入密码' value={password} onChange={setPassword} clearable type='password' />
        </Form.Item>
        <Button disabled={!password||!account} block color='primary' size='large' onClick={signIn}>
            登陆
        </Button>
        <Button block shape='rounded' onClick={()=>change(false)} color='primary'>
            注册
        </Button>
    </Form>
}

export default SignIn