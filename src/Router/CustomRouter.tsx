import React, { FC, Suspense } from 'react';
import {
  BrowserRouter as Router, RouteObject, useLocation, useRoutes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { routerUpdate } from '../Redux/actions';
import { LazyRoute, routeMap } from './RouterMap';

/**
 * 懒加载路由
 * @param originalRoutes
 */
const lazyRoutes = (originalRoutes: LazyRoute.Routes[]) => {
  const warpRoutes: RouteObject[] = [];
  originalRoutes.forEach((route) => {
    warpRoutes.push({
      path: route.path,
      element: (
        <Suspense fallback={<div>路由加载ing...</div>}>
          <route.element />
        </Suspense>
      ),
      children: route.children && lazyRoutes(route.children),
    });
  });
  return warpRoutes;
};

/**
 * 自定义路由组件
 * @constructor
 */
const CustomRouter: FC = () => {
  const dispatch = useDispatch();
  const JsRoutes = () => {
    const jsRoutes = useRoutes(lazyRoutes(routeMap));
    const location = useLocation();
    dispatch(routerUpdate(location));
    return jsRoutes;
  };
  return (
    <Router>
      <JsRoutes />
    </Router>
  );
};

export default CustomRouter;
