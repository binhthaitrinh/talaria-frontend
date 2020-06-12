import React from 'react';
import LogoContainer from './styles/Logo';
import Link from 'next/link';

function Logo(props) {
  return (
    <LogoContainer>
      <Link href="/">
        <a>
          <img src="/talaria-logo.jpg" alt="" />
        </a>
      </Link>
    </LogoContainer>
  );
}

export default Logo;
