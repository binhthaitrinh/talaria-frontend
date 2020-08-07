import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* width: 80rem; */
  margin-bottom: 1.8rem;
  white-space: nowrap;

  & > div {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin-bottom: 1.8rem;

    & > h2 {
      width: 10rem;
      font-size: 1.6rem;
      font-weight: 400;
    }

    & > * {
      margin-right: 1.8rem;
    }

    & > div {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;

      & > * {
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
  }
`;

export default FormContainer;
