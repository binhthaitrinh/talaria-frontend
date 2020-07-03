import styled from 'styled-components';

const OptionPopup = styled.div`
  position: absolute;
  z-index: 999;
  background-color: #fff;
  top: 4.8rem;
  right: 0;
  border-radius: 6px;
  box-shadow: 0 1rem 8rem rgba(0, 0, 0, 0.1), 0 -1rem 8rem rgba(0, 0, 0, 0.1);
  padding: 3rem 3rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default OptionPopup;
