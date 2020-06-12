import React from 'react';
import SidebarStyle from './styles/Sidebar';
import Logo from './Logo';
import Menu from './Menu';

function Sidebar(props) {
  return (
    <SidebarStyle>
      <Logo />
      <Menu />
    </SidebarStyle>
  );
}

export default Sidebar;
