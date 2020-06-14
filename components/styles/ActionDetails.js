import styled from 'styled-components';

const Detail = styled.div`
  background-color: #fff;
  box-shadow: 2px 2px 18px -2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-95%, 15%);
  padding: 0.6rem 0rem;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  li {
    width: 15rem;
    cursor: pointer;
    border-left: 4px solid transparent;
    display: flex;

    a {
      width: 100%;
      height: 100%;
      padding: 1rem 0rem 1rem 1.8rem;
    }

    button {
      width: 100%;
      height: 100%;
      padding: 1rem 0rem 1rem 1.8rem;
      background-color: #fff;
      border: none;
      text-align: left;
      cursor: pointer;

      &:hover {
        outline: none;
        border: none;
      }
    }
  }

  li:hover {
    background-color: ${(props) => props.theme.primaryLight};
    border-left: 4px solid ${(props) => props.theme.primaryDark};
  }
`;

export default Detail;
