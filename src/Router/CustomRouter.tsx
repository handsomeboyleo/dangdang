import React, {FC, useEffect} from 'react';
import {
  BrowserRouter as Router, useLocation, useNavigate, useRoutes,
} from 'react-router-dom';
import {routerUpdate} from "../Redux/actions";
import {useDispatch} from "react-redux";
import { routeMap } from './RouterMap';

const AuthRouter:FC=(props)=>{
  const onLogin = localStorage.getItem('onLogin')
  const navigate = useNavigate()
  useEffect(()=>{
    if(!onLogin){
      navigate('/auth')
    }
  },[navigate, onLogin])
  return <>
    {props.children}
  </>
}

const CustomRouter:FC = () => {
  const dispatch = useDispatch()
  const JsRoutes = () => {
    const jsRoutes= useRoutes(routeMap);
    const location = useLocation();
    dispatch(routerUpdate(location))
    return jsRoutes;
  };
  return (
      <Router>
        <AuthRouter>
          <JsRoutes />
        </AuthRouter>
      </Router>
  )}

export default CustomRouter;
