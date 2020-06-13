import styled from 'styled-components';

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 2.4rem;
  color: #005961;
  border-left: 8px solid ${(props) => props.theme.primaryDark};
  line-height: 1;
  padding-left: 0.8rem;
`;

export default Title;
