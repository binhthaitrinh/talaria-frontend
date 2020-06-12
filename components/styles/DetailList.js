import styled from 'styled-components';

const DetailList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 1.8rem;
  font-weight: 400;
  grid-column-gap: 6.4rem;
  grid-row-gap: 1.6rem;
  color: ${(props) => props.theme.primaryBlack};
`;

export default DetailList;
