import React, { FC } from 'react';

import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { DTabBar } from './TabBar';
import { DHeader } from './Header';

const StyledBody = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Layout: FC = () => (
  <>
    <DHeader />
    <StyledBody>
      <Outlet />
    </StyledBody>
    <DTabBar />
  </>
);
