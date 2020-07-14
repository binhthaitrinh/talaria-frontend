import styled from 'styled-components';

const Dropdown = styled.ul`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  top: 2.8rem;
  right: 0;
  z-index: 1;
  border-radius: 4px;
  padding: 1.2rem 1rem;
  white-space: nowrap;

  li a {
    display: block;
    padding: 0.8rem 0.8rem 0.8rem 1rem;
    color: ${(props) => props.theme.grey};

    &:hover {
      background-color: ${(props) => props.theme.lightGrey};
    }
  }
`;

const Drop = styled.div`
  position: relative;
  display: inline-block;

  &:hover ul {
    display: block;
  }
`;

export { Drop, Dropdown };
