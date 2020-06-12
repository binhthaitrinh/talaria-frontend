import styled from 'styled-components';
import Btn from './Btn';

const BtnPrimary = styled.button`
  ${Btn};
  background-color: ${(props) => props.theme.primary};
  color: #fff;

  height: 4.8rem;
  width: 12rem;

  &:disabled {
    background-color: ${(props) => props.theme.primaryDark};
  }
`;

export default BtnPrimary;
