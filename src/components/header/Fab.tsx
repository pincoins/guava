import { Transition } from '@headlessui/react';
import Button from '../../widgets/Button';
import { Link } from 'react-router-dom';
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

const Fab = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  return (
    <>
      <Button
        onClick={toggle}
        className="text-2xl bg-cyan-300 text-white w-14 h-14 inline-flex justify-center items-center"
        rounded="full"
        flat
      >
        {!isOpen && <MdAdd />}
        {isOpen && <MdClose />}
      </Button>

      <div>
        {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-75 transform"
            enterFrom="translate-y-[115px]"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-700 transform"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-[115px]"
          >
            <Link
              to="/auth/profile"
              onClick={toggle}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[125px] right-[10px]"
            >
              <MdOutlineSettings />
            </Link>
          </Transition>
        )}
        {loginState === 'UNAUTHENTICATED' && (
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-75 transform"
            enterFrom="translate-y-[115px]"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-700 transform"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-[115px]"
          >
            <Link
              to="/auth/sign-in"
              onClick={toggle}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[125px] right-[10px]"
            >
              <MdLogin />
            </Link>
          </Transition>
        )}
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-150 transform"
          enterFrom="translate-y-[106px] translate-x-[44px]"
          enterTo="translate-y-0 -translate-x-0"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-y-0 -translate-x-0"
          leaveTo="translate-y-[106px] translate-x-[44px]"
        >
          <Link
            to="/shop/cart"
            onClick={toggle}
            className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[116px] right-[54px]"
          >
            <MdShoppingBag />
          </Link>
        </Transition>
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-[81px] translate-x-[81px]"
          enterTo="translate-y-0 -translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0 -translate-x-0"
          leaveTo="translate-y-[81px] translate-x-[81px]"
        >
          <Link
            to="/shop/orders"
            onClick={toggle}
            className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[91px] right-[91px]"
          >
            <MdSendToMobile />
          </Link>
        </Transition>
        <Transition
          show={isOpen}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="translate-y-[44px] translate-x-[106px]"
          enterTo="translate-y-0 -translate-x-0"
          leave="transition ease-in-out duration-150 transform"
          leaveFrom="translate-y-0 -translate-x-0"
          leaveTo="translate-y-[44px] translate-x-[106px]"
        >
          <Link
            to="/help/faq"
            onClick={toggle}
            className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[54px] right-[116px]"
          >
            <MdInfoOutline />
          </Link>
        </Transition>
        {(loginState === 'AUTHENTICATED' || loginState === 'EXPIRED') && (
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="translate-x-[115px]"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-75 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-[115px]"
          >
            <Link
              to="/auth/sign-out"
              onClick={toggle}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[10px] right-[125px]"
            >
              <MdLogout />
            </Link>
          </Transition>
        )}
        {loginState === 'UNAUTHENTICATED' && (
          <Transition
            show={isOpen}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="translate-x-[115px]"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-75 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-[115px]"
          >
            <Link
              to="/auth/sign-up"
              onClick={toggle}
              className="absolute text-sm bg-sky-500 text-black w-9 h-9 inline-flex justify-center items-center rounded-full shadow-lg bottom-[10px] right-[125px]"
            >
              <MdPersonAdd />
            </Link>
          </Transition>
        )}
      </div>
    </>
  );
};

export default Fab;
