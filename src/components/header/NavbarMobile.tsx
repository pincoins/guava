import className from 'classnames';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Drawer from './Drawer';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { MdLogin, MdShoppingBag } from 'react-icons/md';
import { authenticated } from './navarItems';

const NavbarMobile = ({ ...rest }) => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  const { items } = useAppSelector((state: RootState) => state.cart);

  const classes = className(rest.className, 'py-1 px-3');

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
            {loginState}
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
              <>
                {authenticated.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className="inline-flex gap-x-1 items-center"
                    >
                      {<item.icon />}
                    </Link>
                  );
                })}
                <Link
                  to="/shop/cart"
                  className="relative inline-flex gap-x-1 items-center"
                >
                  <MdShoppingBag />
                  <span className="absolute -top-2 -end-2 inline-flex items-center justify-center px-1 text-xs text-white bg-[#e88f2f] rounded-full animate-bounce-short">
                    {items.length}
                  </span>
                </Link>
              </>
            )}
          </div>
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
