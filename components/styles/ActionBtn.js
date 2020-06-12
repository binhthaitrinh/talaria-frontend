import styled from 'styled-components';
import Btn from './Btn';

const ActionBtn = styled.button`
  ${Btn};
  width: 4rem;
  height: 4rem;
  padding: 1rem;
  background-color: transparent;

  :hover {
    background-color: ${(props) => props.theme.primary};
    color: #fff;
  }
`;

export default ActionBtn;
