import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd-mobile';
import { SuperSocket } from '../../Utils/superSocket';

const StyledChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Home = () => {
  const ws = SuperSocket;
  const connect = () => {
    ws.init();
  };
  return (
    <StyledChatContainer>
      <Button onClick={connect}>xxxxx</Button>
    </StyledChatContainer>
  );
};

export default Home;
