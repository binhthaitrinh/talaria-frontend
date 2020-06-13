import styled from 'styled-components';
import Btn from './Btn';

const Link = styled.a`
  ${Btn}
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  padding: .8rem 1.6rem;


  &[aria-disabled='true'] {
    background-color: ${(props) => props.theme.grey};
    pointer-events: none;
    
  }

`;

export default Link;
