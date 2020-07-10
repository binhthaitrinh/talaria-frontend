import styled from 'styled-components';

const BtnText = styled.a`
  &,
  &:visited {
    font-size: inherit;
    color: ${(props) => props.theme.primary};
    cursor: pointer;
    font-weight: 400;
    display: inline-block;
    padding: 0.4rem 0.6rem;
    transition: all 0.2s ease-out;
  }

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: #fff;
  }
`;

export default BtnText;
