import React, { ComponentPropsWithoutRef, Fragment } from 'react';
import Button from '../../widgets/Button';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { MdOutlineMenu } from 'react-icons/md';
import DrawerHeading from './DrawerHeading';
import { authenticated, menu, unauthenticated, products } from './navarItems';

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
      <Button
        onClick={onOpen}
        className="text-2xl border-green-950"
        rounded="sm"
      >
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
