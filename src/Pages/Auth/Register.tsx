import React, { FC, useState } from 'react';
import {Button, Form, Input } from 'antd-mobile';
import {register} from "../../API/account";
import {detectLoginAction} from "../../Redux/actions";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {UserType} from "../../Types/accountTypes";
interface ResRegisterType extends UserType{}

interface RegisterProps{
    change: React.Dispatch<React.SetStateAction<boolean>>
}
const Register:FC <RegisterProps>= ({change}) =>{
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const onRegister=async()=>{
        const data = {
            email:account,
            password,
            // id:'nfdiaushfefew',
            // name:'dingdingTest',
            // phoneNumber: 1234567890,
            // age:20,
            // gender:'male',
            // avatar:'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            // description:'我是测试一号'
        }

        await register<ResRegisterType>(data).then((res)=>{
            if(res.code===200){
                dispatch(detectLoginAction({userInfo:res.data,isLogin:true}))
                navigate('/home', {replace: true})
            }
        })
    }

    return <Form layout='horizontal'>
        <Form.Item label='账号' name='email'>
        <Input placeholder='请输入email' value={account} onChange={setAccount} type='email' clearable />
    </Form.Item>
    <Form.Item label='密码' name='password'>
        <Input placeholder='请输入密码' value={password} onChange={setPassword} clearable type='password' />
    </Form.Item>
        <Button onClick={onRegister}>注册</Button>
        <Button onClick={()=>change(true)}>登陆</Button>
</Form>
}
export default Register