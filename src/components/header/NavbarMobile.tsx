import className from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Drawer from './Drawer';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { MdLogin, MdShoppingBag } from 'react-icons/md';
import Fab from './Fab';
import { fabRoutes } from '../../routes/fabRoutes';

const NavbarMobile = ({ ...rest }) => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  const { items } = useAppSelector((state: RootState) => state.cart);

  const pathname =
    fabRoutes.filter((route) => {
      return useLocation().pathname.startsWith(route);
    }).length > 0;

  const classes = className(rest.className, 'py-1 px-3');

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const [fabIsOpen, setFabIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  const handleFabToggle = () => {
    setFabIsOpen(!fabIsOpen);
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
          <div className="flex gap-x-6 items-center">
            {loginState === 'UNAUTHENTICATED' && (
              <Link
                to="/auth/sign-in"
                className="inline-flex gap-x-1 items-center"
              >
                <MdLogin />
                로그인
              </Link>
            )}
            {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
              <Link
                to="/shop/cart"
                className="relative inline-flex gap-x-1 items-center"
              >
                <MdShoppingBag />
                <span className="absolute -top-2 -end-2 inline-flex items-center justify-center px-1 text-xs text-white bg-[#e88f2f] rounded-full animate-bounce-short">
                  {items.length}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 left-6">
        <Drawer
          isOpen={drawerIsOpen}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
        />
      </div>
      {pathname && (
        <div className="fixed bottom-6 right-6">
          <Fab isOpen={fabIsOpen} toggle={handleFabToggle} />
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
