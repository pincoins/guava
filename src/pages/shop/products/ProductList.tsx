import { useFetchProductsQuery } from '../../../store/apis/productApi';
import Skeleton from '../../../widgets/Skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdAddShoppingCart,
  MdArrowDownward,
  MdError,
  MdOutlineStar,
} from 'react-icons/md';
import { useFetchCategoryQuery } from '../../../store/apis/categoryApi';
import Button from '../../../widgets/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk-hooks';
import { RootState } from '../../../store';
import {
  useFetchFavoritesQuery,
  useSaveFavoritesMutation,
} from '../../../store/apis/favoritesApi';
import Panel from '../../../widgets/panel/Panel';
import PanelHeading from '../../../widgets/panel/PanelHeading';
import Divider from '../../../widgets/Divider';
import PanelBody from '../../../widgets/panel/PanelBody';
import { ProductForm } from '../../../types';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addToCart } from '../../../store/slices/cartSlice';
import Modal from '../../../widgets/Modal';
import { useState } from 'react';
import Markdown from 'react-markdown';

const schema = yup.object({
  products: yup.array().of(yup.number().defined()).min(1).required(),
});

const ProductList = () => {
  // 1. URL 파라미터 가져오기
  const { categorySlug: categorySlug } = useParams();

  if (!categorySlug) {
    throw new Error('파라미터 없음 잘못된 요청');
  }

  // 2. 리덕스 스토어 객체 가져오기
  const { loginState, sub } = useAppSelector((state: RootState) => state.auth);
  const { isMobile } = useAppSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatch();

  // 3. 리액트 라우터 네비게이션 객체 가져오기
  const navigate = useNavigate();

  // 4. RTK Query 객체 가져오기
  const resultFavorites = useFetchFavoritesQuery(sub || 0, {
    skip: loginState !== 'AUTHENTICATED',
  });

  let favorite = false;

  const resultCategory = useFetchCategoryQuery(categorySlug);

  let category: JSX.Element | JSX.Element[] = (
    <Skeleton className="h-12 w-full" times={1} />
  );

  const resultProducts = useFetchProductsQuery(categorySlug);

  let products: JSX.Element | JSX.Element[] = (
    <Skeleton className="h-40 w-full" times={1} />
  );

  const [saveFavorites] = useSaveFavoritesMutation();

  // 5. 리액트 훅 폼 정의
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductForm>({ mode: 'onSubmit', resolver: yupResolver(schema) });

  // 6. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [isOpen, setIsOpen] = useState(false);

  // 7. useEffect 호출
  // 8. onValid 폼 제출 핸들러 정의
  const onValid: SubmitHandler<ProductForm> = async (data, _) => {
    data.products.map((item) => {
      if (resultProducts.isSuccess) {
        const product = resultProducts.data.find((i) => i.productId === item);

        if (product) {
          dispatch(
            addToCart({
              productId: product.productId,
            })
          );

          navigate('/shop/cart');
        }
      }
    });
  };

  const onInvalid: SubmitErrorHandler<ProductForm> = async () => {
    handleModalOpen();
  };

  // 9. 이벤트 핸들러 정의
  const handleToggleFavorites = async () => {
    if (
      loginState === 'AUTHENTICATED' &&
      sub &&
      resultCategory.isSuccess &&
      resultFavorites.isSuccess
    ) {
      let favorites;

      if (favorite) {
        favorites = resultFavorites.data.items.filter(
          (item) =>
            !(
              item.id === resultCategory.data.categoryId &&
              item.title === resultCategory.data.title &&
              item.slug === resultCategory.data.slug
            )
        );
      } else {
        favorites = [
          ...resultFavorites.data.items,
          {
            id: resultCategory.data.categoryId,
            slug: resultCategory.data.slug,
            title: resultCategory.data.title,
          },
        ];
      }

      await saveFavorites({ sub, favorites: { items: favorites } })
        .unwrap()
        .then((_) => {})
        .catch((rejected) => {
          console.error(rejected);
        });
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // 10. 출력 데이터 구성
  if (resultCategory.isSuccess && resultFavorites.isSuccess) {
    favorite = !!resultFavorites.data.items.find(
      (item) =>
        item.id === resultCategory.data.categoryId &&
        item.title === resultCategory.data.title &&
        item.slug === resultCategory.data.slug
    );
  }

  if (resultCategory.isError) {
    category = (
      <div className="text-center font-bold text-lg">상품 분류 없음</div>
    );
  } else if (resultCategory.isSuccess) {
    category = (
      <div className="text-lg font-semibold text-[#1d915c] flex items-center justify-between gap-x-4">
        {resultCategory.data.title}
        <Button
          type="button"
          onClick={handleToggleFavorites}
          className={
            favorite
              ? 'text-xs text-rose-600 bg-yellow-200 border-rose-600'
              : 'text-xs text-gray-500 bg-gray-100 border-gray-600'
          }
          rounded="md"
          inline
        >
          <MdOutlineStar />
          즐겨찾기
        </Button>
      </div>
    );
  }

  if (resultProducts.isError) {
    products = <div>상품 목록을 가져오지 못했습니다.</div>;
  } else if (resultProducts.isSuccess) {
    if (resultProducts.data.length === 0) {
      products = (
        <div className="flex items-center text-red-500 justify-center gap-x-2">
          <MdError />
          구매 가능 상품이 없습니다.
        </div>
      );
    } else {
      products = resultProducts.data.map((product) => {
        return (
          <li key={product.productId}>
            <label className="flex gap-x-4 pl-4 sm:pl-0">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-green-950 text-green-800 focus:ring-green-900"
                  value={product.productId}
                  {...register('products')}
                />
              </div>
              <div className="grid grid-cols-1">
                <span className="font-bold text-sm text-green-900">
                  {product.name} &middot; {product.subtitle}
                </span>
                <p className="text-sm text-gray-700 inline-flex gap-x-2">
                  <span className="inline-flex items-center">
                    (
                    {new Intl.NumberFormat('en-US', {
                      style: 'percent',
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    }).format(
                      (product.listPrice - product.sellingPrice) /
                        product.listPrice
                    )}
                    <MdArrowDownward />)
                  </span>
                  {Intl.NumberFormat().format(product.sellingPrice)}원
                </p>
              </div>
            </label>
          </li>
        );
      });
    }
  }

  // 11. JSX 반환
  return (
    <>
      <Panel rounded className="flex-1 flex flex-col gap-y-2 p-2 sm:p-0">
        <PanelHeading>{category}</PanelHeading>
        <Divider />
        <PanelBody className="flex flex-col gap-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-4">
            <div className="sm:order-2 sm:col-span-3 flex flex-col gap-y-2 items-center sm:items-start">
              <Markdown className="w-full text-sm leading-loose break-keep bg-red-100 rounded-md px-4 py-2 prose">
                {resultCategory.data?.description}
              </Markdown>

              {!isMobile && (
                <Markdown className="w-full text-sm leading-loose break-keep bg-gray-50 rounded-md px-4 py-2 prose">
                  {resultCategory.data?.subDescription}
                </Markdown>
              )}
            </div>
            <form
              className="sm:order-1 flex flex-col gap-y-4"
              onSubmit={handleSubmit(onValid, onInvalid)}
            >
              <ul className="space-y-2.5">{products}</ul>
              <Button
                type="submit"
                disabled={loginState !== 'AUTHENTICATED' || isSubmitting}
                className="w-full justify-center font-semibold py-2"
                preset="primary"
                inline
                rounded="md"
              >
                <MdAddShoppingCart /> 장바구니 추가
              </Button>
            </form>
            {isMobile && (
              <Markdown className="w-full text-sm leading-loose break-keep bg-gray-50 rounded-md px-4 py-2 prose">
                {resultCategory.data?.subDescription}
              </Markdown>
            )}
          </div>
        </PanelBody>
      </Panel>
      <Modal
        title={'구매 권종 없음'}
        messages={['구매하실 상품권을 선택해주세요.']}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default ProductList;
