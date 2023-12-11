import { useFetchProductsQuery } from '../../../store/apis/productApi';
import Skeleton from '../../../widgets/Skeleton';
import Divider from '../../../widgets/Divider';
import { useParams } from 'react-router-dom';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Fragment } from 'react';

const ProductList = () => {
  const { categorySlug: categorySlug } = useParams();

  if (!categorySlug) {
    throw new Error('파라미터 없음 잘못된 요청');
  }

  const resultProducts = useFetchProductsQuery({ slug: categorySlug });

  const handleIncrease = (
    productId: number,
    _: React.FormEvent<HTMLButtonElement>
  ) => {
    console.log('add', productId);
  };

  const handleDecrease = (
    productId: number,
    _: React.FormEvent<HTMLButtonElement>
  ) => {
    console.log('remove', productId);
  };

  let products;
  if (resultProducts.isLoading) {
    products = <Skeleton className="h-40 w-full col-span-4" times={1} />;
  } else if (resultProducts.isError) {
    products = <div>상품 목록을 가져오지 못했습니다.</div>;
  } else if (resultProducts.isSuccess) {
    if (resultProducts.data.length === 0) {
      products = (
        <div className="col-span-4 font-bold text-center">
          구매 가능 상품이 없습니다.
        </div>
      );
    } else {
      products = resultProducts.data.map((product) => {
        return (
          <Fragment key={product.productId}>
            <div className="h-18 flex flex-col text-sm justify-center text-center gap-y-1">
              <div className="font-bold">{product.name}</div>
              <div className="font-bold">{product.subtitle}&nbsp;</div>
            </div>
            <div className="col-span-2 flex flex-col gap-y-2 text-sm">
              <div className="text-center">
                {Intl.NumberFormat().format(product.sellingPrice)}원 (
                {new Intl.NumberFormat('en-US', {
                  style: 'percent',
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }).format(
                  (product.listPrice - product.sellingPrice) / product.listPrice
                )}
                )
              </div>
              <label
                htmlFor="google"
                className="flex text-sm font-medium leading-6 text-black justify-center"
              >
                <button
                  type="button"
                  onClick={(e) => handleDecrease(product.productId, e)}
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
                    placeholder="0"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => handleIncrease(product.productId, e)}
                  className="-ml-px inline-flex rounded-r-md p-2 font-bold ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <MdAdd className="h-5 w-5 text-blue-800" />
                </button>
              </label>
            </div>
            <div className="text-right text-sm">
              {Intl.NumberFormat().format(product.listPrice * 200)}원
            </div>
            <Divider className="col-span-4" />
          </Fragment>
        );
      });
    }
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-x-1 gap-y-2 items-center sm:w-2/5 p-2 sm:p-0">
        <div className="text-center font-bold">상품권</div>
        <div className="text-center font-bold col-span-2">단가 / 수량</div>
        <div className="text-center font-bold">소계</div>
        <Divider className="col-span-4" />
        {products}
      </div>
    </>
  );
};

export default ProductList;
