import React, { FC } from 'react';
import {
  BrowserRouter as Router, useRoutes,
} from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Messages } from '../pages/Messages/Messages';
import { Layout } from '../Components/Layout/Layout';
import { NotFoundPage } from '../pages/NotFoundPage';

const routeMap = [
  {
    path: '/',
    element: <Layout />,
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
const JsRoutes = () => {
  const jsRoutes= useRoutes(routeMap);
  return jsRoutes;
};
const CustomRouter:FC = () => (
  <Router>
    <JsRoutes />
  </Router>
);

export default CustomRouter;
