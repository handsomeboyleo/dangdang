import React, {FC, useEffect} from "react";
import {useStoreSelector} from "../Redux/selector";
import initWS from "../Utils/websocket";
import Authorization from "../Pages/Auth/Authorization";

const AuthRouter:FC=({children})=>{
    const onLogin = localStorage.getItem('onLogin')
    const authState = useStoreSelector(state=>state.authState)
    const checkWebAuth=onLogin&&authState.onLogin
    useEffect(()=>{
        if(checkWebAuth){
            initWS('dingding')
        }
    },[checkWebAuth])
    return <>
        {
            checkWebAuth ? <>{children}</>: <Authorization/>
        }
    </>
}

export default AuthRouter