import React from 'react';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import className from 'classnames';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';

const Header = ({ ...rest }) => {
  // 데스크탑 메뉴: fluid (기본값)
  // 모바일 메뉴: fixed = ContainerFixed

  const { isMobile } = useAppSelector((state: RootState) => state.viewport);

  const classes = className(rest.className, '');

  return (
    <header className={classes}>
      {isMobile && <NavbarMobile className="shadow px-2 py-3" />}
      {!isMobile && <NavbarDesktop className="" />}
    </header>
  );
};

export default Header;
