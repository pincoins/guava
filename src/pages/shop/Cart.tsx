import React, { useState } from 'react';
import Panel from '../../widgets/panel/Panel';
import PanelHeading from '../../widgets/panel/PanelHeading';
import Divider from '../../widgets/Divider';
import PanelBody from '../../widgets/panel/PanelBody';
import Button from '../../widgets/Button';
import Modal from '../../widgets/Modal';
import {
  MdAdd,
  MdAddShoppingCart,
  MdClear,
  MdDelete,
  MdError,
  MdRemove,
} from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import {
  addToCart,
  clearCart,
  deleteCartItem,
  removeFromCart,
  setCartItem,
} from '../../store/slices/cartSlice';
import { CartForm, CartItem } from '../../types';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import className from 'classnames';

const schema = yup.object({
  products: yup
    .array()
    .of(
      yup
        .object({
          productId: yup.number().positive().defined(),
          quantity: yup.number().positive().defined(),
        })
        .defined()
    )
    .min(1)
    .defined()
    .required(),
});

const Cart = () => {
  // 1. URL 파라미터 가져오기
  // 2. 리덕스 스토어 객체 가져오기
  const { items } = useAppSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();

  // 3. 리액트 라우터 네비게이션 객체 가져오기
  // 4. RTK Query 객체 가져오기
  // 5. 리액트 훅 폼 정의
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<CartForm>({
    mode: 'onBlur',
    defaultValues: {
      products: items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      }),
    },
    resolver: yupResolver(schema),
  });

  const { fields, remove } = useFieldArray({
    control,
    name: 'products',
  });

  // 6. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [isOpen, setIsOpen] = useState(false);

  // 7. useEffect 호출
  // 8. onValid 폼 제출 핸들러 정의
  const onValid: SubmitHandler<CartForm> = async (data, _) => {
    console.log(data);
  };

  // 9. 이벤트 핸들러 정의
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDeleteItem = (item: CartItem) => {
    dispatch(deleteCartItem(item));
  };

  const handleAddItem = (item: CartItem, index: number) => {
    setValue(`products.${index}.quantity`, item.quantity + 1);
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item: CartItem, index: number) => {
    if (item.quantity > 1) {
      setValue(`products.${index}.quantity`, item.quantity - 1);
      dispatch(removeFromCart(item));
    }
  };

  const handleSetItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: CartItem,
    index: number
  ) => {
    if (e.target.value.trim().length === 0) {
      dispatch(setCartItem({ ...item, quantity: 0 }));
      setError(`products.${index}.quantity`, {
        type: 'INVALID_QUANTITY',
        message: '반드시 1매 이상 선택해야 합니다.',
      });
    } else if (+e.target.value > 0) {
      dispatch(setCartItem({ ...item, quantity: +e.target.value }));
    }
  };

  console.log('errors', errors.products);

  // 10. 출력 데이터 구성
  const cartItems = fields.map((field, index) => {
    const item = items.find((i) => i.productId === field.productId);

    if (item && field) {
      return (
        <React.Fragment key={field.id}>
          <div className="grid grid-cols-1 text-sm">
            <div className="flex justify-between">
              <div className="flex gap-x-4">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteItem(item);
                    }}
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
                    <span>
                      {Intl.NumberFormat().format(item.sellingPrice)}원
                    </span>
                    <span className="text-gray-400 line-through">
                      ({Intl.NumberFormat().format(item.listPrice)}원)
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <label
                  htmlFor={`products.${index}.quantity`}
                  className="flex text-sm font-medium leading-6 text-black justify-center"
                >
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveItem(item, index);
                    }}
                    className="inline-flex items-center rounded-l-md p-2 font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <MdRemove className="h-5 w-5 text-red-500" />
                  </button>
                  <div className="flex focus-within:z-10 -ml-px">
                    <input
                      type="number"
                      {...register(`products.${index}.quantity`, {
                        required: true,
                        onChange: (e) => {
                          if (
                            errors &&
                            errors.products &&
                            errors.products[index]?.quantity
                          ) {
                            clearErrors(`products.${index}.quantity`);
                          }
                          handleSetItem(e, item, index);
                        },
                      })}
                      placeholder="0"
                      className={className(
                        'w-14 sm:w-24 border-0 py-1.5 text-black text-sm ring-1 ring-inset focus:ring-2 focus:ring-inset text-center',
                        !(
                          errors &&
                          errors.products &&
                          errors.products[index]?.quantity
                        )
                          ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-gray-700'
                          : 'text-red-900 ring-red-500 placeholder:text-red-300 focus:ring-red-500 bg-red-400'
                      )}
                      defaultValue={field.quantity}
                    />
                    <input
                      type="hidden"
                      {...register(`products.${index}.productId`, {
                        required: true,
                      })}
                      defaultValue={field.productId}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddItem(item, index);
                    }}
                    className={className(
                      'inline-flex rounded-r-md p-2 font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                      !(
                        errors &&
                        errors.products &&
                        errors.products[index]?.quantity
                      )
                        ? '-ml-px'
                        : ''
                    )}
                  >
                    <MdAdd className="h-5 w-5 text-blue-800" />
                  </button>
                </label>
                <span className="font-bold">
                  {Intl.NumberFormat().format(
                    item.sellingPrice * item.quantity
                  )}
                  원
                </span>
              </div>
            </div>
          </div>
          <Divider />
        </React.Fragment>
      );
    }
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
              onClick={handleClearCart}
              className="text-xs text-gray-500 bg-gray-100 border-gray-600"
              rounded="md"
              inline
            >
              <MdDelete />
              전체삭제
            </Button>
          </div>
        </PanelHeading>
        <Divider />
        <PanelBody className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {items.length > 0 && (
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex flex-col gap-y-4"
            >
              {cartItems}
              <div className="flex justify-around font-bold text-center">
                <span>최종 결제금액</span>
                <span>
                  {Intl.NumberFormat().format(
                    items.reduce(
                      (sum, b) => sum + b.quantity * b.sellingPrice,
                      0
                    )
                  )}
                  원
                </span>
              </div>

              <Button
                type="submit"
                className="w-full justify-center font-semibold py-2"
                preset="primary"
                inline
                rounded="md"
              >
                <MdAddShoppingCart /> 주문완료
              </Button>
            </form>
          )}
          {items.length === 0 && (
            <div className="flex items-center font-bold text-red-500 justify-center sm:justify-start gap-x-2">
              <MdError />
              장바구니가 비었습니다.
            </div>
          )}
        </PanelBody>
      </Panel>
      <Modal
        title={'구매 상품권 없음'}
        messages={['최소 1매 이상 선택해야 합니다.']}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Cart;
