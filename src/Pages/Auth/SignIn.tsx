import React, {FC, useState} from "react";
import {Button, Form, Input} from "antd-mobile";
import {detectLoginAction} from "../../Redux/actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signIn} from "../../API/account";
interface SignInProps{
    change:  React.Dispatch<React.SetStateAction<boolean>>
}
const SignIn:FC<SignInProps> =({change})=>{
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const onSignIn=async()=>{
        const data = {
            account,
            password
        }
        await signIn(data).then((res)=>{
            console.log(res)
            dispatch(detectLoginAction({onLogin:true}))
            navigate('/home', {replace: true})
        })
    }
    const test =()=>{
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
        <Button disabled={!password||!account} block color='primary' size='large' onClick={onSignIn}>
            登陆
        </Button>
        <Button block shape='rounded' onClick={()=>change(false)} color='primary'>
            注册
        </Button>
        <Button onClick={test}>测试</Button>
    </Form>
}

export default SignIn