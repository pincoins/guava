import { useParams } from 'react-router-dom';
import Divider from '../../../widgets/Divider';
import { MdAdd, MdRemove } from 'react-icons/md';
import { useFetchProductsQuery } from '../../../store/apis/productApi';
import Skeleton from '../../../widgets/Skeleton';

const CategoryList = () => {
  const { slug } = useParams();

  const resultProducts = useFetchProductsQuery({
    slug: slug || '',
  });

  console.log(resultProducts);

  let products;
  if (resultProducts.isLoading) {
    products = <Skeleton className="h-32 w-full" times={1} />;
  } else if (resultProducts.error) {
    products = <div>카테고리를 가져오지 못했습니다.</div>;
  } else {
    products = resultProducts.data?.map((product) => {
      return (
        <>
          <div className="h-18 flex flex-col text-sm justify-center text-center gap-y-1">
            <div className="font-bold">{product.name}</div>
            <div className="font-bold">{product.subtitle}</div>
          </div>
          <div className="col-span-2 flex flex-col gap-y-2 text-sm">
            <div className="text-center">
              {Intl.NumberFormat().format(product.sellingPrice)}원
            </div>
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
          </div>
          <div className="text-right text-sm">
            {Intl.NumberFormat().format(product.listPrice * 200)}원
          </div>
          <Divider className="col-span-4" />
        </>
      );
    });
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

export default CategoryList;
