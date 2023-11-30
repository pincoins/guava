import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Button';
import { MdWarning } from 'react-icons/md';

const Modal = ({
  title,
  messages,
  isOpen,
  onClose,
}: {
  title: string;
  messages: string[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 pointer-events-none" />
      )}

      <Transition appear show={isOpen} as={Fragment}>
        {/* 반드시 모달 창 버튼 클릭으로 닫기 */}
        <Dialog as="div" className="relative z-30" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-bold leading-6 text-red-600 inline-flex items-center gap-x-2"
                  >
                    <MdWarning /> {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <ul
                      role="list"
                      className="text-sm list-disc space-y-1 pl-9"
                    >
                      {messages.map((m, index) => {
                        return <li key={index}>{m}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button
                      type="button"
                      onClick={onClose}
                      className="text-sm font-semibold block w-full py-2"
                      preset="primary"
                      inline
                      center
                      rounded="md"
                    >
                      확인
                    </Button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
