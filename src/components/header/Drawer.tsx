import React, { ComponentPropsWithoutRef, Fragment } from 'react';
import Button from '../../widgets/Button';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {
  MdInfoOutline,
  MdLogin,
  MdLogout,
  MdOutlineArrowRight,
  MdOutlineMenu,
  MdPerson,
  MdPersonAdd,
  MdSendToMobile,
  MdShoppingBag,
} from 'react-icons/md';
import DrawerHeading from './DrawerHeading';

const products = [
  {
    id: 1,
    title: '구글기프트카드',
    to: '/shop/categories/구글',
    icon: MdOutlineArrowRight,
  },
  {
    id: 2,
    title: '넥슨카드',
    to: '/shop/categories/넥슨',
    icon: MdOutlineArrowRight,
  },
  {
    id: 3,
    title: '해피머니',
    to: '/shop/categories/해피',
    icon: MdOutlineArrowRight,
  },
  {
    id: 4,
    title: '컬쳐랜드상품권',
    to: '/shop/categories/컬쳐',
    icon: MdOutlineArrowRight,
  },
  {
    id: 5,
    title: '문화상품권',
    to: '/shop/categories/문화',
    icon: MdOutlineArrowRight,
  },
];

const authenticated = [
  {
    id: 1,
    title: '마이페이지',
    to: '/auth/profile',
    icon: MdPerson,
  },
  {
    id: 2,
    title: '로그아웃',
    to: '/auth/sign-out',
    icon: MdLogout,
  },
];

const unauthenticated = [
  {
    id: 1,
    title: '로그인',
    to: '/auth/sign-in',
    icon: MdLogin,
  },
  {
    id: 2,
    title: '회원가입',
    to: '/auth/sign-up',
    icon: MdPersonAdd,
  },
];

const menu = [
  {
    id: 1,
    title: '장바구니',
    to: '/shop/cart',
    icon: MdShoppingBag,
  },
  {
    id: 2,
    title: '고객센터',
    to: '/help/faq',
    icon: MdInfoOutline,
  },
  {
    id: 3,
    title: '주문/발송',
    to: '/shop/orders',
    icon: MdSendToMobile,
  },
];

const Drawer = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
} & ComponentPropsWithoutRef<'div'>) => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <Button onClick={onOpen} className="text-2xl border-green-950">
        <MdOutlineMenu />
      </Button>
      {/* 트랜지션 효과 2개를 감쌀 것 */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={onClose}>
          {/* 백드롭 오버레이: 트랜지션 효과 - ease-in-out(천천히 나타났다 사라짐) */}
          {/* position: fixed - modal, sticky header, sticky footer */}
          {/* 백드롭 터치 시 모달 사라짐 */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-50"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          {/* 실제 서랍 메뉴: 트랜지션 효과 - transition (좌에서 우로 슬라이드) */}
          {/* https://headlessui.com/react/transition#co-ordinating-multiple-transitions */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-100"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-100"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* 모달 기능 속성 */}
            {/* fixed & inset-0 (top:0; right:0; bottom:0; left: 0) */}
            {/* overflow: hidden: 스크롤 허용 안 함 */}
            {/* pointer-events: none - action, hover 등 커서 옵션들 비활성화 */}
            {/* pr-32: 우측 여백으로 백드롭 터치 시 모달 서랍 사라지기 가능 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none pr-32">
              {/* 모달 내용 속성 */}
              <Dialog.Panel className="flex flex-col h-screen overflow-y-scroll pointer-events-auto bg-white shadow-xl">
                <DrawerHeading>
                  <Link to="/" onClick={onClose}>
                    핀코인
                  </Link>
                </DrawerHeading>
                {loginState === 'AUTHENTICATED' &&
                  authenticated.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        to={item.to}
                        className="inline-flex gap-x-2 items-center border-b px-3 py-1"
                        onClick={onClose}
                      >
                        {<item.icon />}
                        {item.title}
                      </Link>
                    );
                  })}
                {loginState === 'UNAUTHENTICATED' &&
                  unauthenticated.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        to={item.to}
                        className="inline-flex gap-x-2 items-center border-b px-3 py-1"
                        onClick={onClose}
                      >
                        {<item.icon />}
                        {item.title}
                      </Link>
                    );
                  })}
                {menu.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className="inline-flex gap-x-2 items-center border-b px-3 py-1"
                      onClick={onClose}
                    >
                      {<item.icon />}
                      {item.title}
                    </Link>
                  );
                })}
                <DrawerHeading>상품권</DrawerHeading>
                {/* 스크롤 가능하게 한 번 감싸줄 것 /*/}
                <div className="flex flex-col h-[calc(100vh_-_264px)] overflow-y-auto">
                  {products.map((item) => {
                    return (
                      <Link
                        key={item.id}
                        to={item.to}
                        className="inline-flex gap-x-2 items-center border-b px-3 py-1"
                        onClick={onClose}
                      >
                        {<item.icon />}
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
                <DrawerHeading>{window.location.hostname}</DrawerHeading>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Drawer;
