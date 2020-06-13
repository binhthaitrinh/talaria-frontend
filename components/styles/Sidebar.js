import styled from 'styled-components';

const Sidebar = styled.div`
  background-color: ${(props) => props.theme.primary};
  grid-area: sidebar;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-right: 1.5px solid rgba(0, 0, 0, 0.15);
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export default Sidebar;
