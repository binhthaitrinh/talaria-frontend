import styled from 'styled-components';

const Option = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > * {
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
`;

export default Option;
