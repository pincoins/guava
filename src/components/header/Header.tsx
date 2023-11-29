import React from 'react';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import className from 'classnames';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';

const Header = ({ ...rest }) => {
  // 데스크탑 메뉴: fluid (기본값)
  // 모바일 메뉴: fixed = ContainerFixed

  const { isMobile } = useAppSelector((state: RootState) => state.ui);

  // z-index 값을 주지 않으면 자식 컴포넌트 때문에 그림자 적용 안 됨
  // z-index: 20 모바일 서랍 메뉴에서 사용 중
  const classes = className(
    rest.className,
    'bg-green-50 shadow-sm shadow-green-600/20 z-10'
  );

  return (
    <header className={classes}>
      {isMobile && <NavbarMobile />}
      {!isMobile && <NavbarDesktop />}
    </header>
  );
};

export default Header;
