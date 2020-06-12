import { useState } from 'react';
import ClientPortal from './Portal';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  background-color: salmon;
  font-size: 1.6rem;
  padding: 0.8rem 1.6rem;
  transform: translateX(-50%);
`;

export default function Noti({ message }) {
  return (
    <ClientPortal selector="#modal">
      <Container>
        <p>{message}</p>
      </Container>
    </ClientPortal>
  );
}
