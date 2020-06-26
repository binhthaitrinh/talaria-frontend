import styled from 'styled-components';
import Btn from './Btn';

const BtnPrimary = styled.button`
  ${Btn};
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  padding: 1.2rem 1.8rem;
`;

export default BtnPrimary;
