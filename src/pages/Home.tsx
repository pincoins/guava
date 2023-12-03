import Panel from '../widgets/panel/Panel';
import PanelHeading from '../widgets/panel/PanelHeading';
import PanelBody from '../widgets/panel/PanelBody';
import { MdArrowDownward } from 'react-icons/md';
import Divider from '../widgets/dividers/Divider';

const products = [
  {
    id: 1,
    name: '구글기프트카드',
    href: '#',
    imageSrc: 'https://placehold.co/468x300/orange/white',
    imageAlt: '상품권이미지',
    price: '6%',
  },
  {
    id: 2,
    name: '넥슨카드',
    href: '#',
    imageSrc: 'https://placehold.co/468x300/blue/white',
    imageAlt: '상품권이미지',
    price: '5%',
  },
  {
    id: 3,
    name: '문화상품권',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/pink/white',
    imageAlt: '상품권이미지',
    price: '4%',
  },
  {
    id: 4,
    name: '해피머니',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/green/white',
    imageAlt: '상품권이미지',
    price: '7%',
  },
  {
    id: 5,
    name: '컬쳐랜드상품권',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/gray/white',
    imageAlt: '상품권이미지',
    price: '7%',
  },
  {
    id: 6,
    name: '도서문화상품권',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/teal/white',
    imageAlt: '상품권이미지',
    price: '5%',
  },
  {
    id: 7,
    name: '플레이스테이션',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/magenta/white',
    imageAlt: '상품권이미지',
    price: '2%',
  },
  {
    id: 8,
    name: '스마트문화상품권',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/violet/white',
    imageAlt: '상품권이미지',
    price: '3%',
  },
  {
    id: 9,
    name: '요기요',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/black/white',
    imageAlt: '상품권이미지',
    price: '3%',
  },
  {
    id: 10,
    name: '한게임상품권',

    href: '#',
    imageSrc: 'https://placehold.co/468x300/aqua/white',
    imageAlt: '상품권이미지',
    price: '1%',
  },
];

const Home = () => {
  return (
    <div className="grid grid-cols-6 p-2 sm:p-0 sm:justify-center gap-x-4 gap-y-4 sm:gap-y-12">
      <Panel className="col-span-6 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">
            오늘의 최저가 상품권
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-6 sm:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative h-32 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-1">
                    <h3 className="font-medium text-gray-900 text-center">
                      {product.name}
                    </h3>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-32 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-br from-white to-black opacity-60" />
                    <p className="relative flex gap-x-2 text-sm font-semibold text-white">
                      최대
                      <span className="inline-flex font-bold items-center text-red-600">
                        {product.price} <MdArrowDownward />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PanelBody>
      </Panel>
      <Panel className="col-span-6 sm:col-span-4 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">
            상품권 금융사기 예방 수칙
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody className="text-sm leading-6">
          <ul
            role="list"
            className="marker:text-[#03353e] list-disc pl-4 space-y-2 mb-4"
          >
            <li>
              게임에서 알게 된 사람으로부터 상품권 구매로 일부 또는 전체 금액을
              입금 받기로 했습니까?
            </li>
            <li>
              중고나라 또는 당근마켓, 번개장터에서 상품권 일부 또는 전체를
              대리구매 하여 카카오톡 등 메신저로 다른 사람에게 주기로 했습니까?
            </li>
            <li>
              네이트온/카카오톡 등 메신저에서 지인이 급한 돈이 필요하다고
              상품권을 요구했습니까?
            </li>
            <li>
              중고나라 또는 당근마켓, 번개장터에서 물품대금을 현금 대신
              상품권으로 요구 받았습니까?
            </li>
          </ul>
          <p className="text-red-600 font-bold">
            위 질문 중 하나라도 해당하면 사기꾼과 메신저 또는 전화 연락을 끊고
            바로 경찰서에 연락하시기 바랍니다.
          </p>
        </PanelBody>
      </Panel>
      <Panel className="col-span-6 sm:col-span-2 gap-y-2">
        <PanelBody>애드센스</PanelBody>
      </Panel>
      <Panel className="col-span-6 sm:col-span-3 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">공지사항</h3>
        </PanelHeading>
        <Divider />
        <PanelBody>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="flex gap-x-4">
              <span className="flex-none">[말머리]</span>
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-none">[말머리]</span>
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-none">[말머리]</span>
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-none">[말머리]</span>
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-none">[말머리]</span>
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
          </div>
        </PanelBody>
      </Panel>
      <Panel className="col-span-6 sm:col-span-3 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">이용후기</h3>
        </PanelHeading>
        <Divider />
        <PanelBody>
          <div className="grid grid-cols-1 gap-y-2">
            <div className="flex gap-x-4">
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
            <div className="flex gap-x-4">
              <span className="flex-1 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              <span className="flex-none">2023.12.01</span>
            </div>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default Home;
