import styled from 'styled-components';
import Btn from './Btn';

const BtnGrey = styled.button`
  ${Btn};
  background-color: ${(props) => props.theme.lightGrey};
  color: ${(props) => props.theme.grey};
  padding: 1.2rem 2rem;
  text-transform: capitalize !important;

  &:hover {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1) !important;
  }

  &:active {
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1) !important;
  }
`;

export default BtnGrey;
