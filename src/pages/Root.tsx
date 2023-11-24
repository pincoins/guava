import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { signOut } from '../store/slices/authSlice';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { setViewportSize } from '../store/slices/viewportSlice';

const Root = () => {
  const { accessToken, expiresIn } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const handleWindowResize = () => {
    dispatch(
      setViewportSize({ width: window.innerWidth, height: window.innerHeight })
    );
  };

  useEffect(() => {
    // 자동 로그아웃
    if (accessToken && expiresIn) {
      // token is always refreshed whenever refreshing page.
      const timer = setTimeout(() => {
        dispatch(signOut());
      }, expiresIn * 1000); // seconds to milliseconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [accessToken, expiresIn, dispatch]);

  useEffect(() => {
    // 자동 로그인 시도

    // 뷰 포트 가로 크기에 따라 반응형 모바일 여부 결정
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // 사이트 기본 레이아웃
  // 컨테이너: 뷰포트 100vh 높이로 공간 확보 - display: flex; flex-direction: column; height: 100vh;
  // - 헤더: 자신의 크기만큼 - flex: 0 0 auto;
  // - 본문: 부모 크기만큼 커지거나 작아짐 - flex: 1 1 0;
  // - 푸터: 자신의 크기만큼 - flex: 0 0 auto;

  return (
    <div className="flex flex-col h-screen">
      <Header className="flex-none" />
      <div className="flex-1 overflow-auto bg-white">
        <Outlet />
      </div>
      <Footer className="flex-none" />
    </div>
  );
};

export default Root;
