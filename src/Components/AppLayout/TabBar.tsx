import React, { FC } from 'react';
import {
  AppOutline, MessageOutline, UnorderedListOutline, UserOutline,
} from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledTabBar = styled(TabBar)`
  flex: 0;
  border-top: solid 1px var(--adm-border-color);
`;
const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: <AppOutline />,
  },
  {
    key: '/contact',
    title: '联系人',
    icon: <UnorderedListOutline />,
  },
  {
    key: '/messages',
    title: '我的消息',
    icon: <MessageOutline />,
  },
  {
    key: '/userCenter',
    title: '个人中心',
    icon: <UserOutline />,
  },
];
export const DTabBar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const setRouteActive = (value: string) => {
    navigate(value);
  };
  return (
    <StyledTabBar
      activeKey={pathname}
      onChange={(value) => setRouteActive(value)}
    >
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </StyledTabBar>
  );
};
