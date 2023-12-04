import { useCallback, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { useAppDispatch, useAppSelector } from '../hooks/rtk-hooks';
import signOut from '../pages/auth/SignOut';
import { RootState } from '../store';
import { useRefreshMutation } from '../store/apis/authApi';
import { setViewportSize } from '../store/slices/uiSlice';
import ContainerFixed from '../widgets/ContainerFixed';
import { noSidebarRoutes } from './noSidebarRoutes';
import {
  MdCardGiftcard,
  MdOutlineArrowRight,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { useFetchCategoriesQuery } from '../store/apis/categoryApi';
import Skeleton from '../widgets/Skeleton';

const Root = () => {
  // 1. 리덕스 스토어 객체 가져오기
  const { rememberMe, accessToken, validUntil, expiresIn, loginState } =
    useAppSelector((state: RootState) => state.auth);

  const { isMobile } = useAppSelector((state: RootState) => state.ui);

  const dispatch = useAppDispatch();

  // 2. 리액트 라우터 네비게이션 객체 가져오
  // 3. RTK Query 객체 가져오기
  const [refresh] = useRefreshMutation();

  const resultCategories = useFetchCategoriesQuery();

  // 4. 리액트 훅 폼 정의
  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅) 및 함수 정의
  const pathname = noSidebarRoutes.includes(useLocation().pathname);

  const hasSidebar = !isMobile && !pathname;

  const handleWindowResize = useCallback(() => {
    dispatch(
      setViewportSize({ width: window.innerWidth, height: window.innerHeight })
    );
  }, [dispatch]);

  // 6. onValid 폼 제출 핸들러
  // 7. useEffect
  useEffect(() => {
    // 뷰 포트 가로 크기에 따라 반응형 모바일 여부 결정
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  useEffect(() => {
    // 타임아웃 자동 로그아웃 설정
    if (loginState === 'AUTHENTICATED' && expiresIn) {
      // 액세스 토큰은 언제나 새로고침 때문에 새 토큰을 받음
      // 최상위 레이아웃이므로 라우트 페이지 이동해도 리렌더링되지 않음
      const timer = setTimeout(() => {
        // 상단에서 AUTHENTICATED 조건으로 들어와서
        // 타임아웃 시점에는 loginState === 'EXPIRED' 조건 사용할 수 없음
        if (rememberMe && validUntil && new Date() < new Date(validUntil)) {
          // `EXPIRED` 상태 확인 후 http only, secure 쿠키로 재로그인
          refresh();
        } else {
          dispatch(signOut());
        }
      }, expiresIn * 1000); // seconds to milliseconds

      // 콜백의 반환타입이 void | Destructor 이므로
      // 조건절 안에서도 useEffect() 클린업 함수를 반환 가능
      return () => {
        if (timer !== null) {
          clearTimeout(timer);
        }
      };
    }

    // useEffect() 의존성 변경 감지 후 자동 로그인 시도
    if (loginState === 'EXPIRED') {
      refresh();
    }
  }, [
    rememberMe,
    accessToken,
    validUntil,
    expiresIn,
    loginState,
    dispatch,
    refresh,
  ]);

  // 8. 이벤트 핸들러
  // 9. 출력 데이터 구성
  let categories;
  if (resultCategories.isLoading) {
    categories = <Skeleton className="h-32 w-full" times={1} />;
  } else if (resultCategories.error) {
    categories = <div>카테고리를 가져오지 못했습니다.</div>;
  } else {
    categories = resultCategories.data?.map((category) => {
      return (
        <li key={category.slug}>
          <Link
            to={`shop/categories/${category.slug}`}
            className="px-2 py-1 hover:bg-gray-50 inline-flex items-center"
          >
            {<MdOutlineArrowRight />}
            {category.title}
          </Link>
        </li>
      );
    });
  }

  // 10. JSX 반환

  // 사이트 기본 레이아웃
  // 고정 푸터 - 100vh;
  // 스크롤바 여백 발생해도 로고 고정 - 100vw;
  // 컨테이너: 뷰포트 100vh 높이로 공간 확보 - display: flex; flex-direction: column; height: 100vh; width: 100vw;
  // - 헤더: 자신의 크기만큼 - flex: 0 0 auto;
  // - 본문: 부모 크기만큼 커지거나 작아짐 - flex: 1 1 0;
  // - 푸터: 자신의 크기만큼 - flex: 0 0 auto;

  return (
    <div className="flex flex-col sm:gap-y-8 w-screen h-screen">
      <Header className="flex-none" />
      <div className="flex-1">
        {/* sidebar 있으면 무조건 데스크톱 */}
        {hasSidebar && (
          <ContainerFixed className="flex">
            <div className="flex-1 grid grid-cols-6 gap-x-16">
              <div className="flex flex-col gap-y-8 text-sm">
                <div className="f-none bg-gray-50">
                  <div className="font-bold text-green-950 bg-gray-300 px-2 py-1 inline-flex items-center w-full gap-x-2">
                    <MdOutlineStarBorder />
                    즐겨찾기
                  </div>
                  <ul role="list">{categories}</ul>
                </div>
                <div className="f-none bg-gray-50">
                  <div className="font-bold text-green-950 bg-gray-300 px-2 py-1 inline-flex items-center w-full gap-x-2">
                    <MdCardGiftcard />
                    상품권
                  </div>
                  <ul role="list">{categories}</ul>
                </div>
              </div>
              <div className="col-span-5 bg-white">
                <Outlet />
              </div>
            </div>
          </ContainerFixed>
        )}
        {!hasSidebar && (
          <ContainerFixed className="flex sm:justify-center">
            <Outlet />
          </ContainerFixed>
        )}
      </div>
      <Footer className="flex-none" />
    </div>
  );
};

export default Root;
