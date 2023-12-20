import className from 'classnames';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import Drawer from './Drawer';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import {
  MdAdd,
  MdArrowDropDown,
  MdClose,
  MdInfoOutline,
  MdLogin,
  MdLogout,
  MdOutlineSettings,
  MdPerson,
  MdPersonAdd,
  MdSendToMobile,
  MdShoppingBag,
} from 'react-icons/md';
import { authenticated } from './navarItems';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Button from '../../widgets/Button';

const NavbarMobile = ({ ...rest }) => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  const { items } = useAppSelector((state: RootState) => state.cart);

  const classes = className(rest.className, 'py-1 px-3');

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const [fabIsOpen, setFabIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  const handleToggleFab = () => {
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
          isOpen={drawerIsOpen}
          onOpen={handleDrawerOpen}
          onClose={handleDrawerClose}
        />
      </div>
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handleToggleFab}
          className="text-2xl bg-cyan-300 text-white w-14 h-14 inline-flex justify-center items-center"
          rounded="full"
          flat
        >
          {!fabIsOpen && <MdAdd />}
          {fabIsOpen && <MdClose />}
        </Button>
        {fabIsOpen && (
          <div>
            {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
              <Link
                to="/auth/profile"
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[125px] right-[10px]"
              >
                <MdOutlineSettings />
              </Link>
            )}
            {loginState === 'UNAUTHENTICATED' && (
              <Link
                to="/auth/sign-in"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[125px] right-[10px]"
              >
                <MdLogin />
              </Link>
            )}
            <Link
              to="/shop/cart"
              onClick={handleToggleFab}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[116px] right-[54px]"
            >
              <MdShoppingBag />
            </Link>
            <Link
              to="/shop/orders"
              onClick={handleToggleFab}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[91px] right-[91px]"
            >
              <MdSendToMobile />
            </Link>
            <Link
              to="/help/faq"
              onClick={handleToggleFab}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[54px] right-[116px]"
            >
              <MdInfoOutline />
            </Link>
            {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
              <Link
                to="/auth/sign-out"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[10px] right-[125px]"
              >
                <MdLogout />
              </Link>
            )}
            {loginState === 'UNAUTHENTICATED' && (
              <Link
                to="/auth/sign-up"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[10px] right-[125px]"
              >
                <MdPersonAdd />
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarMobile;
