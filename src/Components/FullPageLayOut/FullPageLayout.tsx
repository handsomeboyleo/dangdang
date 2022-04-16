import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const StyledBody = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto
`;
const FullPageLayout: React.FC = () => (
  <>
    <StyledBody>
      <Outlet />
    </StyledBody>
  </>
);

export default FullPageLayout;
