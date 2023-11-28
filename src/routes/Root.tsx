import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { useAppDispatch, useAppSelector } from '../hooks/rtk-hooks';
import signOut from '../pages/auth/SignOut';
import { RootState } from '../store';
import { useRefreshMutation } from '../store/services/authApi';
import { setViewportSize } from '../store/slices/viewportSlice';

const Root = () => {
  // 1. 리덕스 스토어 객체 가져오기
  const { rememberMe, accessToken, validUntil, expiresIn, loginState } =
    useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  // 2. 리액트 라우터 네비게이션 객체 가져오
  // 3. RTK Query 객체 가져오기
  const [refresh] = useRefreshMutation();

  // 4. 리액트 훅 폼 정의
  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅) 및 함수 정의

  const handleWindowResize = useCallback(() => {
    dispatch(
      setViewportSize({ width: window.innerWidth, height: window.innerHeight })
    );
  }, []);

  // 6. onValid 폼 제출 핸들러
  // 7. useEffect
  useEffect(() => {
    // 뷰 포트 가로 크기에 따라 반응형 모바일 여부 결정
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

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
  }, [rememberMe, accessToken, validUntil, expiresIn, loginState, dispatch]);

  // 8. 이벤트 핸들러
  // 9. JSX 반환

  // 사이트 기본 레이아웃
  // 컨테이너: 뷰포트 100vh 높이로 공간 확보 - display: flex; flex-direction: column; height: 100vh;
  // - 헤더: 자신의 크기만큼 - flex: 0 0 auto;
  // - 본문: 부모 크기만큼 커지거나 작아짐 - flex: 1 1 0;
  // - 푸터: 자신의 크기만큼 - flex: 0 0 auto;

  return (
    <div className="flex flex-col gap-y-1 md:gap-y-4 h-screen">
      <Header className="flex-none" />
      <div className="flex-1 bg-white">
        <Outlet />
      </div>
      <Footer className="flex-none" />
    </div>
  );
};

export default Root;
