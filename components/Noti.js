import { useState } from 'react';
import ClientPortal from './Portal';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  background-color: ${(props) =>
    props.type === 'success' ? props.theme.success : props.theme.danger};
  font-size: 1.6rem;
  padding: 0.8rem 1.6rem;
  transform: translateX(-50%);
  color: ${(props) =>
    props.tyle === 'success' ? props.theme.primaryDark : '#fff'};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export default function Noti({ message, type }) {
  return (
    <ClientPortal selector="#modal">
      <Container type={type}>
        <p>{message}</p>
      </Container>
    </ClientPortal>
  );
}
