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
    if (accessToken && expiresIn) {
      // token is always refreshed whenever refreshing page.
      setTimeout(() => {
        dispatch(signOut());
      }, expiresIn * 1000); // seconds to milliseconds
    }
  }, [accessToken, expiresIn, dispatch]);

  return (
    <div>
      <UpperNavbar />
      <LowerNavbar />
      <Outlet />
    </div>
  );
};

export default Root;
