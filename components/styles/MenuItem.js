import styled from 'styled-components';

const MenuItem = styled.li`
  font-size: 1.4rem;
  line-height: 1;
  font-weight: 400;
  color: #fff;
  text-transform: capitalize;

  ion-icon {
    font-size: 1.8rem;
    margin-right: 2rem;
    transform: translateY(3px);
  }

  a {
    padding: 1.4rem 0 1.8rem 4.2rem;
    width: 100%;
    display: block;
    transition: all 0.2s ease-out;
    border-left: 8px solid transparent;

    &:hover {
      background-color: #005961;
      border-left: 8px solid #a06c00;
    }

    &.active {
      background-color: #005961;
      border-left: 8px solid #a06c00;
      font-weight: 700;
    }
  }
`;

export default MenuItem;
