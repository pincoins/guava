import React from 'react';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';

const Header = ({ ...rest }) => {
  // 데스크탑 메뉴: fluid (기본값)
  // 모바일 메뉴: fixed = ContainerFixed

  return (
    <header className={rest.className}>
      <NavbarMobile className="shadow px-2 py-3" />
      <NavbarDesktop className="" />
    </header>
  );
};

export default Header;
