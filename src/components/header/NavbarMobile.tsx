import className from 'classnames';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import Drawer from './Drawer';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import {
  MdAdd,
  MdClose,
  MdInfoOutline,
  MdLogin,
  MdLogout,
  MdOutlineSettings,
  MdPersonAdd,
  MdSendToMobile,
  MdShoppingBag,
} from 'react-icons/md';
import { Transition } from '@headlessui/react';
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

        <div>
          {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
            <Transition
              show={fabIsOpen}
              enter="transition ease-in-out duration-75 transform"
              enterFrom="translate-y-[115px]"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-700 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-[115px]"
            >
              <Link
                to="/auth/profile"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[125px] right-[10px]"
              >
                <MdOutlineSettings />
              </Link>
            </Transition>
          )}
          {loginState === 'UNAUTHENTICATED' && (
            <Transition
              show={fabIsOpen}
              enter="transition ease-in-out duration-75 transform"
              enterFrom="translate-y-[115px]"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-700 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-[115px]"
            >
              <Link
                to="/auth/sign-in"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[125px] right-[10px]"
              >
                <MdLogin />
              </Link>
            </Transition>
          )}
          <Transition
            show={fabIsOpen}
            enter="transition ease-in-out duration-150 transform"
            enterFrom="translate-y-[106px] translate-x-[44px]"
            enterTo="translate-y-0 -translate-x-0"
            leave="transition ease-in-out duration-500 transform"
            leaveFrom="translate-y-0 -translate-x-0"
            leaveTo="translate-y-[106px] translate-x-[44px]"
          >
            <Link
              to="/shop/cart"
              onClick={handleToggleFab}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[116px] right-[54px]"
            >
              <MdShoppingBag />
            </Link>
          </Transition>
          <Transition
            show={fabIsOpen}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-y-[81px] translate-x-[81px]"
            enterTo="translate-y-0 -translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0 -translate-x-0"
            leaveTo="translate-y-[81px] translate-x-[81px]"
          >
            <Link
              to="/shop/orders"
              onClick={handleToggleFab}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[91px] right-[91px]"
            >
              <MdSendToMobile />
            </Link>
          </Transition>
          <Transition
            show={fabIsOpen}
            enter="transition ease-in-out duration-500 transform"
            enterFrom="translate-y-[44px] translate-x-[106px]"
            enterTo="translate-y-0 -translate-x-0"
            leave="transition ease-in-out duration-150 transform"
            leaveFrom="translate-y-0 -translate-x-0"
            leaveTo="translate-y-[44px] translate-x-[106px]"
          >
            <Link
              to="/help/faq"
              onClick={handleToggleFab}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[54px] right-[116px]"
            >
              <MdInfoOutline />
            </Link>
          </Transition>
          {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
            <Transition
              show={fabIsOpen}
              enter="transition ease-in-out duration-700 transform"
              enterFrom="translate-x-[115px]"
              enterTo="-translate-x-0"
              leave="transition ease-in-out duration-75 transform"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-[115px]"
            >
              <Link
                to="/auth/sign-out"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[10px] right-[125px]"
              >
                <MdLogout />
              </Link>
            </Transition>
          )}
          {loginState === 'UNAUTHENTICATED' && (
            <Transition
              show={fabIsOpen}
              enter="transition ease-in-out duration-700 transform"
              enterFrom="translate-x-[115px]"
              enterTo="-translate-x-0"
              leave="transition ease-in-out duration-75 transform"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-[115px]"
            >
              <Link
                to="/auth/sign-up"
                onClick={handleToggleFab}
                className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[10px] right-[125px]"
              >
                <MdPersonAdd />
              </Link>
            </Transition>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
