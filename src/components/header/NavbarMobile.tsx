import className from 'classnames';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Drawer from './Drawer';

const NavbarMobile = ({ ...rest }) => {
  const classes = className(rest.className, 'p-1');

  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  // 모바일 메뉴 (fixed)
  return (
    <>
      <div className={classes}>
        <div className="flex justify-between items-center">
          {/* 로고, 서랍 메뉴 버거 아이콘 justify-between 요소 배치 */}
          <div>
            <Link to="/" className="inline-flex items-center gap-x-1">
              <img
                src={process.env.SITE_LOGO}
                alt={process.env.SITE_TITLE}
                className="h-4 w-4"
              />
              <span className="text-xl font-bold whitespace-nowrap text-[#e88f2f]">
                {process.env.SITE_TITLE}
              </span>
            </Link>
          </div>
          <div className="flex gap-x-4 items-center">로그인</div>
        </div>
      </div>
      <div className="fixed bottom-6 left-6">
        <Drawer
          isOpen={isOpen}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
        />
      </div>
    </>
  );
};

export default NavbarMobile;
