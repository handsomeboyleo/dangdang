import React, { FC } from 'react';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { routerUpdate } from '../Redux/actions';
import { routeMap } from './RouterMap';
import AuthRouter from './AuthRouter';
import SuperSocketProvider from '../Utils/SuperSocketProvider';

const CustomRouter:FC = () => {
  const dispatch = useDispatch();
  const JsRoutes = () => {
    const jsRoutes = useRoutes(routeMap);
    const location = useLocation();
    dispatch(routerUpdate(location));
    return jsRoutes;
  };
  return (
    <Router>
      <AuthRouter>
        <SuperSocketProvider>
          <JsRoutes />
        </SuperSocketProvider>
      </AuthRouter>
    </Router>
  );
};

export default CustomRouter;
