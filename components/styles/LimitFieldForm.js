import styled from 'styled-components';

const LimitFieldForm = styled.form`
  width: 60rem;

  & > div:first-child {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 1.8rem;

    input {
      margin-right: 1.6rem;
    }
  }
`;

export default LimitFieldForm;
