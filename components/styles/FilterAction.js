import styled from 'styled-components';

const FilterAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > * {
    &:not(:last-child) {
      margin-right: 1.8rem;
    }
  }
`;

export default FilterAction;
