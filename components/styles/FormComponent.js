import styled from 'styled-components';

const Select = styled.select`
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  padding: 0.8rem 1.6rem;
  border-radius: 2px;
  background-color: ${(props) => props.theme.offWhite};
  border: none;
  border-bottom: 2.5px solid transparent;
  border-top: 2.5px solid transparent;
  display: block;
  transition: all 0.3s;
`;

const FormInputSm = styled.input`
  font-size: 1.2rem;
  font-family: inherit;
  color: inherit;
  padding: 0.8rem 1.6rem;
  border-radius: 2px;
  background-color: ${(props) => props.theme.offWhite};
  border: none;
  border-bottom: 5px solid transparent;
  display: block;

  transition: all 0.3s;

  &:focus {
    border-bottom: 5px solid ${(props) => props.theme.primary};
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    outline: none;
  }

  &:focus:invalid {
    border-bottom: 5px solid red;
  }
`;

export { Select, FormInputSm };
