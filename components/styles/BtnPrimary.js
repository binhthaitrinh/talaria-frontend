import styled from 'styled-components';
import Btn from './Btn';

const BtnPrimary = styled.button`
  ${Btn};
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  padding: 0.8rem 1.6rem;
`;

export default BtnPrimary;
