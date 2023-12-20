import className from 'classnames';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import Drawer from './Drawer';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import {
  MdArrowDropDown,
  MdLogin,
  MdPerson,
  MdShoppingBag,
} from 'react-icons/md';
import { authenticated } from './navarItems';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

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
                <Menu as="div" className="relative inline-block text-left">
                  <div className="flex items-center">
                    <Menu.Button className="inline-flex w-full justify-center gap-x-0.5">
                      <MdPerson />
                      <MdArrowDropDown />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute -right-8 z-10 mt-2 w-28 origin-top-right divide-y divide-gray-300 rounded-md bg-stone-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {authenticated.map((item) => {
                        return (
                          <div className="py-1" key={item.id}>
                            <Menu.Item>
                              <Link
                                to={item.to}
                                className={classNames(
                                  'group flex gap-x-2 items-center px-2 py-1 text-sm font-bold text-black'
                                )}
                              >
                                {<item.icon />} {item.title}
                              </Link>
                            </Menu.Item>
                          </div>
                        );
                      })}
                    </Menu.Items>
                  </Transition>
                </Menu>
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
