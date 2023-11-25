import React from 'react';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { Link, Outlet } from 'react-router-dom';
import getLoginState from '../utils/getLoginState';

interface ProtectedRoutProps {
  roles: string[];
}

const ProtectedRoute = (props: ProtectedRoutProps) => {
  const { rememberMe, accessToken, expiresIn, validUntil, role } =
    useAppSelector((state: RootState) => state.auth);

  if (getLoginState(rememberMe, accessToken, validUntil) === 'EXPIRED') {
    // unauthorized
    return (
      <div>
        <h2 className="text-red-600">로그인 안 함</h2>
        <Link to="/auth/sign-in">로그인</Link>
      </div>
    );
  }

  if (!role || (role && props.roles.indexOf(role) < 0)) {
    // forbidden
    return (
      <div>
        <h2 className="text-red-600">권한 없음</h2>
        <Link to="/auth/sign-in">로그인</Link>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
