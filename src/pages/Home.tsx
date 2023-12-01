import ContainerFixed from '../widgets/ContainerFixed';
import Panel from '../widgets/panel/Panel';
import PanelHeading from '../widgets/panel/PanelHeading';
import PanelBody from '../widgets/panel/PanelBody';

const Home = () => {
  return (
    <ContainerFixed className="grid grid-cols-6 p-2 sm:p-0 sm:justify-center gap-x-8 gap-y-8">
      <Panel divided className="col-span-6 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">
            오늘의 최저가 상품권
          </h3>
        </PanelHeading>
        <PanelBody>상품들 나열</PanelBody>
      </Panel>
      <Panel divided className="col-span-6 md:col-span-4 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">
            상품권 금융사기 예방 수칙
          </h3>
        </PanelHeading>
        <PanelBody>
          <ul
            role="list"
            className="marker:text-[#03353e] text-sm list-disc pl-4 space-y-2 mb-4 leading-8"
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
          <p className="text-red-600 font-bold leading-8">
            위 질문 중 하나라도 해당하면 사기꾼과 메신저 또는 전화 연락을 끊고
            바로 경찰서에 연락하시기 바랍니다.
          </p>
        </PanelBody>
      </Panel>
      <Panel divided className="col-span-6 md:col-span-2 gap-y-2">
        <PanelBody>애드센스</PanelBody>
      </Panel>
      <Panel divided className="col-span-6 md:col-span-3 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">공지사항</h3>
        </PanelHeading>
        <PanelBody>
          <div className="grid grid-cols-1">
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
      <Panel divided className="col-span-6 md:col-span-3 gap-y-2">
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f]">이용후기</h3>
        </PanelHeading>
        <PanelBody>
          <div className="flex gap-x-4">
            <span className="flex-1 truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
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
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
            <span className="flex-none">2023.12.01</span>
          </div>
        </PanelBody>
      </Panel>
    </ContainerFixed>
  );
};

export default Home;
