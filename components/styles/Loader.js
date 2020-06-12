import styled from 'styled-components';

const Loader = styled.div`
  width: 8rem;
  height: 8rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  div {
    position: absolute;
    border: 4px solid ${(props) => props.theme.primaryDark};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

const Loader2 = () => {
  return (
    <Loader>
      <div></div>
      <div></div>
    </Loader>
  );
};

export default Loader2;
