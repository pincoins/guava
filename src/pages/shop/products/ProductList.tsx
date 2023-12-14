import { useFetchProductsQuery } from '../../../store/apis/productApi';
import Skeleton from '../../../widgets/Skeleton';
import { useParams } from 'react-router-dom';
import {
  MdAddShoppingCart,
  MdArrowDownward,
  MdOutlineStar,
} from 'react-icons/md';
import { useFetchCategoryQuery } from '../../../store/apis/categoryApi';
import Button from '../../../widgets/Button';
import { useAppSelector } from '../../../hooks/rtk-hooks';
import { RootState } from '../../../store';
import {
  useFetchFavoritesQuery,
  useSaveFavoritesMutation,
} from '../../../store/apis/favoritesApi';
import Panel from '../../../widgets/panel/Panel';
import PanelHeading from '../../../widgets/panel/PanelHeading';
import Divider from '../../../widgets/Divider';
import PanelBody from '../../../widgets/panel/PanelBody';

const ProductList = () => {
  const { categorySlug: categorySlug } = useParams();

  if (!categorySlug) {
    throw new Error('파라미터 없음 잘못된 요청');
  }

  const { loginState, sub } = useAppSelector((state: RootState) => state.auth);

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
              />
            </div>
            <div className="grid grid-cols-1">
              <label
                htmlFor={product.slug}
                className="font-bold text-sm text-green-900"
              >
                {product.name} {product.subtitle}
              </label>
              <p className="text-sm text-gray-700 inline-flex gap-x-2">
                {Intl.NumberFormat().format(product.sellingPrice)}원
                <span className="text-red-600 inline-flex items-center">
                  (
                  {new Intl.NumberFormat('en-US', {
                    style: 'percent',
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }).format(
                    (product.listPrice - product.sellingPrice) /
                      product.listPrice
                  )}
                  % <MdArrowDownward />)
                </span>
              </p>
            </div>
          </li>
        );
      });
    }
  }

  return (
    <Panel rounded className="flex-1 grid grid-cols-1 gap-y-2 p-2 sm:p-0">
      <PanelHeading>{category}</PanelHeading>
      <Divider />
      <PanelBody className="grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-4">
          <ul className="sm:order-2 sm:col-span-3 marker:text-[#03353e] text-sm list-disc list-inside leading-loose break-keep bg-yellow-100 rounded-md px-4 py-2">
            <li>일일 충전한도는 50만원입니다.</li>
            <li>
              대한민국 구글플레이스토어의 게임과 상품만 구매할 수 있습니다. 구글
              계정의 국가설정을 대한민국으로 해야 사용할 수 있습니다.
            </li>
            <li>
              구글코리아는 국내법을 따르지 않고 취소/환불을 지원하지 않아 계정
              오류 발생 등 어떤 경우에도 교환/환불 처리되지 않습니다.
            </li>
            <li>
              카드 사용을 위해 구글에서 추가 정보를 요구하는 경우에 당사는
              이의제기를 위한 소명자료를 제공합니다. 단, 이의제기 후 구글에서
              거절할 경우 그 거절사유를 알려주지도 않아서 교환/환불이
              불가합니다.
            </li>
          </ul>
          <ul className="sm:order-1 space-y-2.5">{products}</ul>
        </div>
        <div className="text-center">
          <Button
            type="button"
            disabled={loginState !== 'AUTHENTICATED'}
            className="w-full justify-center text-md font-semibold bg-orange-500 text-white p-2"
            inline
            rounded="full"
          >
            <MdAddShoppingCart /> 장바구니 추가
          </Button>
        </div>
      </PanelBody>
    </Panel>
  );
};

export default ProductList;
