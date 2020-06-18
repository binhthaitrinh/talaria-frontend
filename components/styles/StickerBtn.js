import styled from 'styled-components';
import Btn from './Btn';

const StickerBtn = styled.div`
  ${Btn};
  text-transform: capitalize !important;
  background-color: ${(props) => props.theme[props.type]};
  color: #fff;
  padding: 0.6rem 1rem;
`;

export default StickerBtn;
