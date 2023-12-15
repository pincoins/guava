import { useFetchProductsQuery } from '../../../store/apis/productApi';
import Skeleton from '../../../widgets/Skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdAddShoppingCart,
  MdArrowDownward,
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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addToCart } from '../../../store/slices/cartSlice';

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

  const resultProducts = useFetchProductsQuery({ slug: categorySlug });

  let products: JSX.Element | JSX.Element[] = (
    <Skeleton className="h-40 w-full" times={1} />
  );

  const [saveFavorites] = useSaveFavoritesMutation();

  // 5. 리액트 훅 폼 정의
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>({ mode: 'onSubmit', resolver: yupResolver(schema) });

  // 6. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  // 7. useEffect 호출
  // 8. onValid 폼 제출 핸들러 정의
  const onValid: SubmitHandler<ProductForm> = async (data, _) => {
    data.products.map((item) => {
      const product = resultProducts.data?.find((i) => i.productId === item);

      dispatch(addToCart(product));

      navigate('/shop/cart');
    });
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
      <div className="text-lg font-semibold text-[#e88f2f] flex items-center justify-between gap-x-4">
        {resultCategory.data.title}
        <Button
          type="button"
          onClick={handleToggleFavorites}
          className={
            favorite
              ? 'text-xs text-orange-500 bg-yellow-200 border-orange-500'
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
      products = <div className="font-bold">구매 가능 상품이 없습니다.</div>;
    } else {
      products = resultProducts.data.map((product) => {
        return (
          <li key={product.productId} className="flex gap-x-4 pl-4 sm:pl-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-green-950 text-green-800 focus:ring-green-900"
                value={product.productId}
                {...register('products')}
              />
            </div>
            <div className="grid grid-cols-1">
              <label
                htmlFor={product.slug}
                className="font-bold text-sm text-green-900"
              >
                {product.name} &middot; {product.subtitle}
              </label>
              <p className="text-sm text-gray-700 inline-flex gap-x-2">
                {Intl.NumberFormat().format(product.sellingPrice)}원
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
              </p>
            </div>
          </li>
        );
      });
    }
  }

  // 11. JSX 반환
  return (
    <Panel rounded className="flex-1 flex flex-col gap-y-2 p-2 sm:p-0">
      <PanelHeading>{category}</PanelHeading>
      <Divider />
      <PanelBody className="flex flex-col gap-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-4">
          <div className="sm:order-2 sm:col-span-3 flex flex-col gap-y-2 items-center sm:items-start">
            <ul className="marker:text-[#03353e] w-full text-sm list-disc list-inside leading-loose break-keep bg-red-100 rounded-md px-4 py-2">
              <li>일일 충전한도는 50만원입니다.</li>
              <li>
                대한민국 구글플레이스토어의 게임과 상품만 구매할 수 있습니다.
                구글 계정의 국가설정을 대한민국으로 해야 사용할 수 있습니다.
              </li>
              <li>
                구글코리아는 국내법을 따르지 않고 취소/환불을 지원하지 않아 계정
                오류 발생 등 어떤 경우에도 교환/환불 처리되지 않습니다.
              </li>
              <li>
                카드 사용을 위해 구글에서 추가 정보를 요구하는 경우에 당사는
                이의제기를 위한 소명자료를 제공합니다. 단, 이의제기 후 구글에서
                거절할 경우 합당한 거절사유를 알려주지도 않아서 교환/환불이
                불가합니다.
              </li>
            </ul>
            {!isMobile && (
              <ul className="marker:text-[#03353e] w-full text-sm list-disc list-inside leading-loose break-keep bg-gray-50 rounded-md px-4 py-2">
                <li>상품권 안내</li>
                <ul className="list-disc list-inside pl-4">
                  <li>구글기프트카드</li>
                  <li>발행회사: 구글코리아</li>
                  <li>홈페이지: https://play.google.com/store</li>
                  <li>고객센터: 080-234-0051</li>
                  <li>
                    상품권 번호 형식: 알파벳/숫자 20자리 또는 알파벳/숫자 16자리
                    <ul className="list-disc list-inside pl-8">
                      <li>1ABC-2DEF-3GHJ-4KLM-5NOP</li>
                      <li>1ABC-2DEF-3GHJ-4KLM</li>
                    </ul>
                  </li>
                </ul>
              </ul>
            )}
          </div>
          <form
            className="sm:order-1 flex flex-col gap-y-4"
            onSubmit={handleSubmit(onValid)}
          >
            <ul className="space-y-2.5">{products}</ul>
            <Button
              type="submit"
              disabled={loginState !== 'AUTHENTICATED'}
              className="w-full justify-center font-semibold bg-orange-500 text-white py-2"
              inline
              rounded="full"
            >
              <MdAddShoppingCart /> 장바구니 추가
            </Button>
          </form>
          {isMobile && (
            <ul className="marker:text-[#03353e] text-sm list-disc list-inside leading-loose break-keep bg-gray-50 rounded-md px-4 py-2">
              <li>상품권 안내</li>
              <ul className="list-disc list-inside pl-4">
                <li>구글기프트카드</li>
                <li>발행회사: 구글코리아</li>
                <li>홈페이지: https://play.google.com/store</li>
                <li>고객센터: 080-234-0051</li>
                <li>
                  상품권 번호 형식: 알파벳/숫자 20자리 또는 알파벳/숫자 16자리
                  <ul className="list-disc list-inside pl-8">
                    <li>1ABC-2DEF-3GHJ-4KLM-5NOP</li>
                    <li>1ABC-2DEF-3GHJ-4KLM</li>
                  </ul>
                </li>
              </ul>
            </ul>
          )}
        </div>
      </PanelBody>
    </Panel>
  );
};

export default ProductList;
