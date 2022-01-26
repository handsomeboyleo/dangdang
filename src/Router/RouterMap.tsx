import React from "react";
import {AppLayout} from "../Components/AppLayout/AppLayout";
import {Home} from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import {Messages} from "../Pages/Messages/Messages";
import UserCenter from "../Pages/UserCenter/UserCenter";
import {NotFoundPage} from "../Pages/NotFoundPage";
import Authorization from "../Pages/Auth/Authorization";

export const routeMap = [
    {
        path: '/auth',
        element: <Authorization />, //登陆与注册
    },
    {
        path: '/',
        element: <AppLayout />, //app内页面
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'messages',
                element: <Messages />,
            },
            {
                path: 'userCenter',
                element: <UserCenter />,
            },
        ],
    },
    {
        path: '*',
        element:<NotFoundPage/>
    }
]