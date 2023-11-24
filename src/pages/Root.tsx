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

  return (
    <div>
      <UpperNavbar />
      <LowerNavbar />
      <Outlet />
    </div>
  );
};

export default Root;
