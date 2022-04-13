import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd-mobile';
import { useStoreSelector } from '../../Redux/selector';
import { SuperSocket } from '../../Utils/superSocket';

const StyledChatContainer = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
`;
const Home = () => {
  const auth = useStoreSelector((s) => s.authState);
  const ws = SuperSocket;
  const connect = () => {
    ws.init(auth.userInfo.id);
  };
  return (
    <StyledChatContainer>
      <Button onClick={connect}>xxxxx</Button>
    </StyledChatContainer>
  );
};

export default Home;
