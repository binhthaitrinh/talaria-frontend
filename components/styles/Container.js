import styled from 'styled-components';

const Container = styled.div`
  height: 92vh;
  width: 90%;
  background-color: ${(props) => props.theme.primaryLight};
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-areas:
    'sidebar header'
    'sidebar main';
  grid-template-rows: 7.2rem 1fr;
  grid-template-columns: 32rem 1fr;
  box-shadow: 2px 8px 24px -4px rgba(0, 0, 0, 0.4);
`;

export default Container;
