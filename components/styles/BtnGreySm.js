import styled from 'styled-components';
import Btn from './Btn';

const BtnGreySm = styled.button`
  ${Btn};
  background-color: ${(props) => props.theme.lightGrey};
  color: ${(props) => props.theme.grey};
  padding: 0.8rem 2rem;
  text-transform: capitalize !important;
  font-size: 1.4rem !important;

  &:hover {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1) !important;
  }

  &:active {
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1) !important;
  }
`;

export default BtnGreySm;
