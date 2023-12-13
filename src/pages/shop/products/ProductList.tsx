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
    <Skeleton className="h-40 w-full col-span-4" times={1} />
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

  if (resultCategory.isError) {
    category = (
      <div className="col-span-4 text-center font-bold text-lg">
        상품 분류 없음
      </div>
    );
  } else if (resultCategory.isSuccess) {
    category = (
      <div className="text-[#e88f2f] font-bold text-xl leading-none inline-flex items-center justify-center gap-x-3">
        {resultCategory.data.title}
        <Button
          onClick={handleToggleFavorites}
          rounded="full"
          className={
            favorite
              ? 'text-sm text-orange-500 bg-yellow-400 border-orange-500'
              : 'text-sm text-gray-500 bg-gray-100 border-gray-600'
          }
        >
          <MdOutlineStar />
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
          <li key={product.productId} className="flex gap-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-700 text-blue-700 focus:ring-blue-700"
              />
            </div>
            <div className="grid grid-cols-1">
              <label htmlFor={product.slug} className="font-bold text-sm">
                {product.name} {product.subtitle}
              </label>
              <p className="text-sm text-gray-700 inline-flex items-center">
                {Intl.NumberFormat().format(product.sellingPrice)}원 (
                {new Intl.NumberFormat('en-US', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format(
                  (product.listPrice - product.sellingPrice) / product.listPrice
                )}
                % <MdArrowDownward />)
              </p>
            </div>
          </li>
        );
      });
    }
  }

  return (
    <Panel shadow rounded className="flex flex-col gap-y-2 px-8 py-4">
      <PanelHeading className="gap-y-2">
        {category}
        <ul className="marker:text-[#03353e] text-sm list-disc leading-6 rounded-md bg-yellow-50 px-4 py-2">
          <li>한국 구글플레이스토어의 게임과 상품만 구매할 수 있습니다.</li>
          <li>
            지메일 계정의 국가 설정을 대한민국으로 해야 충전 및 결제할 수
            있습니다.
          </li>
          <li>일일 충전한도는 50만원입니다.</li>
          <li>
            구글코리아는 국내법을 따르지 않고 취소/환불을 지원하지 않아 계정
            오류 발생 등 어떤 경우에도 환불 처리되지 않습니다.
          </li>
          <li>
            현재 등록할 수 없는 카드라는 오류 또는 사용 후 게임 내 아이템 충전
            시 구글에서 추가 정보를 요구하는 경우가 발생해도 절대 환불 처리가 안
            됩니다.
          </li>
          <li>
            구글은 이의제기를 해도 거절되면 그 이유를 알려주지도 않고 계속
            거절하기 때문에 어떠한 대응도 안 됩니다.
          </li>
        </ul>
      </PanelHeading>

      <ul className="space-y-2.5">{products}</ul>
      <div className="text-center">
        <Button
          className="w-full justify-center text-md bg-orange-500 text-white p-4"
          inline
          rounded="md"
        >
          <MdAddShoppingCart /> 장바구니 추가
        </Button>
      </div>
    </Panel>
  );
};

export default ProductList;
