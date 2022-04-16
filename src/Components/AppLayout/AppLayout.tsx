import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { DTabBar } from './TabBar';

const StyledBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto
`;
const AppLayout: React.FC = () => (
  <>
    {/* <DHeader /> */}
    <StyledBody>
      <Outlet />
    </StyledBody>
    <DTabBar />
  </>
);
export default AppLayout;
