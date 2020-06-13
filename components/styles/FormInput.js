import styled from 'styled-components';

const Input = styled.input`
  font-size: 1.5rem;
  font-family: inherit;
  color: inherit;
  padding: 1.5rem 2rem;
  border-radius: 2px;
  background-color: ${(props) => props.theme.offWhite};
  border: none;
  border-bottom: 5px solid transparent;
  display: block;
  transition: all 0.3s;
  margin-top: 0.5rem;

  &:focus {
    border-bottom: 5px solid ${(props) => props.theme.primary};
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    outline: none;
  }

  &:focus:invalid {
    border-bottom: 5px solid red;
  }
`;

export default Input;
