import { css } from 'styled-components';

const Btn = css`
  &,
  &:link,
  &:visited {
    text-transform: uppercase;
    text-decoration: none;

    display: inline-block;
    border-radius: 10rem;
    transition: all 0.2s;
    position: relative;
    font-size: inherit;

    border: none;
    cursor: pointer;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

    &::after {
      transform: scaleX(1.4) scaleY(1.6);
      opacity: 0;
    }
  }

  &:active,
  &:focus {
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`;

export default Btn;
