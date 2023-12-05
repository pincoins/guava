import { useParams } from 'react-router-dom';
import Divider from '../../../widgets/Divider';

const CategoryList = () => {
  const { category } = useParams();

  const products = [
    {
      listPrice: 35000,
      sellingPrice: 32550,
      name: '틴캐시',
      subtitle: '3만5천원(3700RP)',
    },
    {
      listPrice: 14000,
      sellingPrice: 13020,
      name: '틴캐시',
      subtitle: '1만4천원(1425RP)',
    },
    {
      listPrice: 9900,
      sellingPrice: 9207,
      name: '틴캐시',
      subtitle: '9천9백원(980RP)',
    },
    {
      listPrice: 4900,
      sellingPrice: 4557,
      name: '틴캐시',
      subtitle: '4천9백원(480RP)',
    },
    {
      listPrice: 50000,
      sellingPrice: 46500,
      name: '틴캐시',
      subtitle: '5만원',
    },
    {
      listPrice: 30000,
      sellingPrice: 27900,
      name: '틴캐시',
      subtitle: '3만원',
    },
    {
      listPrice: 10000,
      sellingPrice: 9300,
      name: '틴캐시',
      subtitle: '1만원',
    },
    {
      listPrice: 5000,
      sellingPrice: 5000,
      name: '틴캐시',
      subtitle: '5천원',
    },
    {
      listPrice: 3000,
      sellingPrice: 3000,
      name: '틴캐시',
      subtitle: '3천원',
    },
    {
      listPrice: 1000,
      sellingPrice: 1000,
      name: '틴캐시',
      subtitle: '1천원',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-x-1 gap-y-2 items-center sm:w-2/5 p-2 sm:p-0">
        <div className="text-center font-bold">상품권</div>
        <div className="text-center font-bold col-span-2">단가 / 수량</div>
        <div className="text-center font-bold">소계</div>
        <Divider className="col-span-4" />
        {products.map((product) => {
          return (
            <>
              <div className="h-18 flex flex-col text-sm justify-center text-center gap-y-1">
                <div className="font-bold">{product.name}</div>
                <div className="font-bold">{product.subtitle}</div>
              </div>
              <div className="col-span-2 flex flex-col gap-y-1">
                <div className="text-center text-sm">
                  {Intl.NumberFormat().format(product.sellingPrice)}원
                </div>
                <label
                  htmlFor="google"
                  className="flex text-sm font-medium leading-6 text-black justify-center"
                >
                  <div className="focus-within:z-10 -ml-px">
                    <input
                      type="number"
                      name="google"
                      id="google"
                      className="w-14 sm:w-24 border-0 rounded-md py-1.5 text-black text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 text-center"
                      placeholder="0"
                    />
                  </div>
                </label>
              </div>
              <div className="text-right text-sm">
                {Intl.NumberFormat().format(product.listPrice * 200)}원
              </div>
              <Divider className="col-span-4" />
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoryList;
