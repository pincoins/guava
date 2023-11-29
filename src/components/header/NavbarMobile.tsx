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
    <div className={classes}>
      <div className="flex justify-between">
        {/* 로고, 버거 아이콘 justify-between 요소 배치 */}
        <div>
          <Link to="/" className="font-bold text-lg">
            <img src={process.env.SITE_LOGO} alt={process.env.SITE_TITLE} />
          </Link>
        </div>
        <div>
          <Drawer
            isOpen={isOpen}
            onOpen={handleDrawerOpen}
            onClose={handleDrawerClose}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
