import styled from 'styled-components';

const MenuItem = styled.li`
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 700;
  color: ${(props) => props.theme.primaryDark};
  text-transform: uppercase;

  ion-icon {
    font-size: 1.8rem;
    margin-right: 2rem;
    transform: translateY(3px);
  }

  a {
    padding: 1.6rem 0 2rem 5.4rem;
    width: 100%;
    display: block;
    transition: all 0.2s ease-out;
    border-right: 8px solid transparent;

    &:hover {
      background-color: ${(props) => props.theme.primaryLight};
      border-right: 8px solid ${(props) => props.theme.primaryDark};
    }

    &.active {
      background-color: ${(props) => props.theme.primaryLight};
      border-right: 8px solid ${(props) => props.theme.primaryDark};
    }
  }
`;

export default MenuItem;
