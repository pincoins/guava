import Panel from '../widgets/panel/Panel';
import PanelHeading from '../widgets/panel/PanelHeading';
import PanelBody from '../widgets/panel/PanelBody';
import Divider from '../widgets/Divider';
import { useFetchCategoriesQuery } from '../store/apis/categoryApi';
import Skeleton from '../widgets/Skeleton';
import CategoryCarousel from '../components/carousel/CategoryCarousel';

const Home = () => {
  const resultCategories = useFetchCategoriesQuery();

  let categories;

  if (resultCategories.isLoading) {
    categories = <Skeleton className="h-32 w-full" times={2} />;
  } else if (resultCategories.isError) {
    categories = <div>상품분류정보를 가져오지 못했습니다.</div>;
  } else if (resultCategories.isSuccess) {
    if (resultCategories.data.length === 0) {
      categories = (
        <div className="col-span-4 font-bold text-center">
          구매 가능 상품이 없습니다.
        </div>
      );
    } else {
      categories = <CategoryCarousel categories={resultCategories.data} />;
    }
  }

  return (
    <div className="grid grid-cols-6 p-2 sm:p-0 sm:justify-center gap-x-4 gap-y-4 sm:gap-y-8">
      <Panel className="col-span-6 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">
            오늘의 최저가 상품권
          </h3>
        </PanelHeading>
        <Divider className="mt-1 mb-2" />
        <PanelBody className="flex flex-col gap-y-4">{categories}</PanelBody>
      </Panel>
      <Panel className="col-span-6 sm:col-span-4 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#1d915c]">
            상품권 금융사기 예방 수칙
          </h3>
        </PanelHeading>
        <Divider className="mt-1 mb-2" />
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
          <h3 className="text-lg font-semibold text-[#1d915c]">공지사항</h3>
        </PanelHeading>
        <Divider className="mt-1 mb-2" />
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
          <h3 className="text-lg font-semibold text-[#1d915c]">이용후기</h3>
        </PanelHeading>
        <Divider className="mt-1 mb-2" />
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
