import React, {FC} from 'react';
import {NavBar} from 'antd-mobile';
import styled from 'styled-components';
import {useStoreSelector} from '../../Redux/selector';

const StyledNavBar = styled(NavBar)`
    flex: 0;
    border-bottom: solid 1px var(--adm-border-color);
`;

export const DHeader: FC = () => {
    const header = useStoreSelector((s) => s.headerInfo);
    return <StyledNavBar>{header.title}</StyledNavBar>;
};
