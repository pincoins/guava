import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UpperNavbar from '../components/header/UpperNavbar';
import LowerNavbar from '../components/header/LowerNavbar';
import { useAppDispatch, useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { signOut } from '../store/slices/authSlice';

const Root = () => {
  const { accessToken, expiresIn } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

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
  }, []);

  // 사이트 기본 레이아웃
  // 컨테이너: 뷰포트 100vh 높이로 공간 확보 - display: flex; flex-direction: column; height: 100vh;
  // - 헤더: 자신의 크기만큼 - flex: 0 0 auto;
  // - 본문: 부모 크기만큼 커지거나 작아짐 - flex: 1 1 0;
  // - 푸터: 자신의 크기만큼 - flex: 0 0 auto;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-green-50">
        <UpperNavbar />
        <LowerNavbar />
      </div>
      <div className="flex-1 overflow-auto bg-white">
        <Outlet />
      </div>
      <div className="flex-none bg-yellow-50">푸터</div>
    </div>
  );
};

export default Root;
