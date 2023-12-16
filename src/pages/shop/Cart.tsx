import React, { useState } from 'react';
import Panel from '../../widgets/panel/Panel';
import PanelHeading from '../../widgets/panel/PanelHeading';
import Divider from '../../widgets/Divider';
import PanelBody from '../../widgets/panel/PanelBody';
import Button from '../../widgets/Button';
import Modal from '../../widgets/Modal';
import { MdAdd, MdClear, MdDeleteForever, MdRemove } from 'react-icons/md';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';

const Cart = () => {
  // 1. URL 파라미터 가져오기
  // 2. 리덕스 스토어 객체 가져오기
  const { items } = useAppSelector((state: RootState) => state.cart);

  // 3. 리액트 라우터 네비게이션 객체 가져오기
  // 4. RTK Query 객체 가져오기
  // 5. 리액트 훅 폼 정의
  // 6. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [isOpen, setIsOpen] = useState(false);

  // 7. useEffect 호출
  // 8. onValid 폼 제출 핸들러 정의
  // 9. 이벤트 핸들러 정의
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // 10. 출력 데이터 구성
  const cartItems = items.map((item) => {
    console.log(item);
    return (
      <>
        <div className="grid grid-cols-1 text-sm">
          <div className="flex justify-between">
            <div className="flex gap-x-4">
              <div>
                <button
                  type="button"
                  className="inline-flex rounded-md p-2 font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <MdClear className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="font-bold">
                  {item.name} <br />
                  {item.subtitle} (
                  {new Intl.NumberFormat('en-US', {
                    style: 'percent',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }).format(
                    (item.listPrice - item.sellingPrice) / item.listPrice
                  )}
                  )
                </p>
                <p className="flex gap-x-2">
                  <span>{Intl.NumberFormat().format(item.sellingPrice)}원</span>
                  <span className="text-gray-400 line-through">
                    ({Intl.NumberFormat().format(item.listPrice)}원)
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <label
                htmlFor="google"
                className="flex text-sm font-medium leading-6 text-black justify-center"
              >
                <button
                  type="button"
                  className="inline-flex items-center rounded-l-md p-2 font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <MdRemove className="h-5 w-5 text-red-500" />
                </button>
                <div className="flex focus-within:z-10 -ml-px">
                  <input
                    type="number"
                    name="google"
                    id="google"
                    className="w-14 sm:w-24 border-0 py-1.5 text-black text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 text-center"
                    value={item.quantity}
                    placeholder="0"
                  />
                </div>
                <button
                  type="button"
                  className="-ml-px inline-flex rounded-r-md p-2 font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <MdAdd className="h-5 w-5 text-blue-800" />
                </button>
              </label>
              <span className="font-bold">
                {Intl.NumberFormat().format(item.sellingPrice * item.quantity)}
                원
              </span>
            </div>
          </div>
        </div>
        <Divider />
      </>
    );
  });

  // 11. JSX 반환
  return (
    <>
      <Panel rounded className="flex-1 flex flex-col gap-y-2 p-2 sm:p-0">
        <PanelHeading>
          <div className="text-lg font-semibold text-[#e88f2f] flex items-center justify-between gap-x-4">
            장바구니
            <Button
              type="button"
              className="text-xs text-gray-500 bg-gray-100 border-gray-600"
              rounded="md"
              inline
            >
              <MdDeleteForever />
              비우기
            </Button>
          </div>
        </PanelHeading>
        <Divider />
        <PanelBody className="grid grid-cols-1 gap-x-8 gap-y-4">
          <div className="flex flex-col w-full sm:w-1/2 gap-y-4">
            {cartItems}
          </div>
        </PanelBody>
      </Panel>
      <Modal
        title={'상품권 선택 안 함'}
        messages={['상품권은 최소 1종 이상 선택해야 합니다.']}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Cart;
