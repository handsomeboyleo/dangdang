import React, { FC } from 'react'
import { NavBar } from 'antd-mobile'
import styled from 'styled-components'

const StyledNavBar = styled(NavBar)`
    flex: 0;
    border-bottom: solid 1px var(--adm-border-color);
`

export const DHeader: FC = () => { 
    return <StyledNavBar>配合路由使用</StyledNavBar>
}