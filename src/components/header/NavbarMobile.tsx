import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames';

const NavbarMobile = ({ ...rest }) => {
  const classes = className(rest.className, 'md:hidden');

  // 모바일 메뉴 (fixed)
  return (
    <div className={classes}>
      <div className="flex justify-between">
        {/* 로고, 버거 아이콘 justify-between 요소 배치 */}
        <div>
          <Link to="/" className="font-bold text-lg">
            LOGO {process.env.SITE_TITLE}
          </Link>
        </div>
        <div>
          <div>drawer</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
