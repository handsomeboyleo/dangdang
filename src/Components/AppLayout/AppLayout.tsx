import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { DTabBar } from './TabBar';
import { DHeader } from './Header';
const StyledBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const AppLayout: React.FC = () => {

    return(
        <>
            <DHeader />
                <StyledBody>
                    <Outlet />
                </StyledBody>
            <DTabBar />
        </>
    )
};
export default AppLayout