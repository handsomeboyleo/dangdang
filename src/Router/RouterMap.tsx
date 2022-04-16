import React, { lazy } from 'react';

// 声明懒加载路由列表类型
export namespace LazyRoute {
  export type Routes = {
    path: string,
    element: React.LazyExoticComponent<any>,
    children?: Routes[]
  }
}

export const routeMap: LazyRoute.Routes[] = [
  {
    path: '/auth',
    element: lazy(() => import('../Pages/Auth/Authorization')), // 登陆与注册
  },
  {
    path: '/chat',
    element: lazy(() => import('../Pages/Messages/Chat')),
  },
  {
    path: '/',
    element: lazy(() => import('../Components/AppLayout/AppLayout')), // app内页面
    children: [
      {
        path: 'home',
        element: lazy(() => import('../Pages/Home/Home')),
      },
      {
        path: 'contact',
        element: lazy(() => import('../Pages/Contact/Contact')),
      },
      {
        path: 'messages',
        element: lazy(() => import('../Pages/Messages/Messages')),
      },
      {
        path: 'userCenter',
        element: lazy(() => import('../Pages/UserCenter/UserCenter')),
      },
    ],
  },
  {
    path: '*',
    element: lazy(() => import('../Pages/NotFoundPage')),
  },
];
