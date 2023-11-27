import React, { ComponentPropsWithoutRef, Fragment } from 'react';
import Button from '../../widgets/Button';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {
  MdInfoOutline,
  MdLogin,
  MdOutlineMenu,
  MdPerson,
  MdSendToMobile,
  MdShoppingBag,
} from 'react-icons/md';

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
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          {/* 백드롭 오버레이: 애니메이션 효과 - ease-in-out(천천히 나타났다 사라짐) */}
          {/* position: fixed - modal, sticky header, sticky footer */}
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
          {/* 실제 서랍 메뉴: 애니메이션 효과 - transition (좌에서 우로 슬라이드) */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-100"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-100"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pr-32">
                {/* 우측 여백으로 크기 조정 */}
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div>
                      <h1 className="font-bold border-l-4 border-b border-green-600 bg-green-50 text-green-800 px-2 py-1">
                        <Link to="/" onClick={onClose}>
                          핀코인
                        </Link>
                      </h1>
                    </div>
                    {loginState === 'AUTHENTICATED' && (
                      <>
                        <Link
                          to="/auth/profile"
                          className="border-b px-3 py-1 flex gap-x-2 items-center"
                          onClick={onClose}
                        >
                          <MdPerson />
                          <span>마이페이지</span>
                        </Link>
                        <Link
                          to="/auth/sign-out"
                          className="border-b px-3 py-1 flex gap-x-2 items-center"
                          onClick={onClose}
                        >
                          <MdLogin />
                          <span>로그아웃</span>
                        </Link>
                      </>
                    )}
                    {loginState === 'UNAUTHENTICATED' && (
                      <>
                        <Link
                          to="/auth/sign-in"
                          className="border-b px-3 py-1 flex gap-x-2 items-center"
                          onClick={onClose}
                        >
                          <MdLogin />
                          <span>로그인</span>
                        </Link>
                        <Link
                          to="/auth/sign-up"
                          className="border-b px-3 py-1 flex gap-x-2 items-center"
                          onClick={onClose}
                        >
                          <MdPerson />
                          <span>회원가입</span>
                        </Link>
                      </>
                    )}
                    <div className="border-b px-3 py-1 flex gap-x-2 items-center">
                      <MdSendToMobile />
                      <span>주문/발송</span>
                    </div>
                    <div className="border-b px-3 py-1 flex gap-x-2 items-center">
                      <MdShoppingBag />
                      <span>장바구니</span>
                    </div>
                    <div className="border-b px-3 py-1 flex gap-x-2 items-center">
                      <MdInfoOutline />
                      <span>고객센터</span>
                    </div>
                    <div>
                      <h1 className="font-bold border-l-4 border-b border-green-600 bg-green-50 text-green-800 px-2 py-1">
                        상품권
                      </h1>
                    </div>
                    <div className="overflow-y-auto h-[calc(100vh_-_264px)]">
                      ...
                    </div>
                    <div>
                      <h1 className="font-bold border-l-4 border-t border-green-600 bg-green-50 text-green-800 px-2 py-1">
                        {window.location.hostname}
                      </h1>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Drawer;
