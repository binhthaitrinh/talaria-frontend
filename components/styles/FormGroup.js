import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  & > *:not(:last-child) {
    margin-right: 2rem;
  }
`;

export default FormGroup;
