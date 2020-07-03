import { useState } from 'react';
import ClientPortal from './Portal';
import styled from 'styled-components';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  font-size: 1.6rem;
  padding: 2.4rem 3.2rem;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.primaryDark};
  border-radius: 4px;
`;

export default function Noti({ children, setShowModal }) {
  return (
    <ClientPortal selector="#modal">
      <Background onClick={() => setShowModal(false)}>
        {' '}
        <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
      </Background>
    </ClientPortal>
  );
}
