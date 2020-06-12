import styled from 'styled-components';

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 3.2rem;
  color: ${(props) => props.theme.primary};
`;

export default Title;
