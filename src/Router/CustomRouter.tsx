import React, {FC} from 'react';
import {
  BrowserRouter as Router, useLocation,useRoutes,
} from 'react-router-dom';
import {routerUpdate} from "../Redux/actions";
import {useDispatch} from "react-redux";
import { routeMap } from './RouterMap';
import AuthRouter from "./AuthRouter";

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
