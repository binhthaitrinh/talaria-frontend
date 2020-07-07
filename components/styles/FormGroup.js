import styled from 'styled-components';

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  & > *:not(:last-child) {
    margin-right: 2rem;
  }

  input,
  select {
    grid-column: 4 / -1;
  }

  label {
    grid-column: 1 / 4;
  }
`;

export default FormGroup;
