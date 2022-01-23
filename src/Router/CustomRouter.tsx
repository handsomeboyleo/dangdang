import React, { FC } from 'react';
import {
  BrowserRouter as Router, useLocation, useRoutes,
} from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { Messages } from '../Pages/Messages/Messages';
import { AppLayout } from '../Components/AppLayout/AppLayout';
import { NotFoundPage } from '../Pages/NotFoundPage';

const routeMap = [
  {
    path: '/',
    element: <AppLayout />, //app内页面
    children: [
      {
        index: true,
        path: 'home',
        element: <Home />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
    ],
  },
  {
    path: '*',
    element:<NotFoundPage/>
  }
];

const CustomRouter:FC = () => {

  const JsRoutes = () => {
    const jsRoutes= useRoutes(routeMap);
    const location = useLocation();
    console.log(location)
    return jsRoutes;
  };
  return (
      <Router>
        <JsRoutes />
      </Router>
  )}

export default CustomRouter;
