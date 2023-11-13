import React from 'react';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { Link, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  if (!accessToken) {
    return (
      <div>
        <h2 className="text-red-600">로그인 안 함</h2>
        <Link to="/auth/sign-in" className="border">
          로그인
        </Link>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
