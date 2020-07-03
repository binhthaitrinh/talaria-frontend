import styled from 'styled-components';

const ActionBtnGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 400;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    a {
      &:not(:last-child) {
        margin-right: 2rem;
      }
    }
  }
`;

export default ActionBtnGroup;
