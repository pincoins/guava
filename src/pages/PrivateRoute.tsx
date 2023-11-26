import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { Outlet, useNavigate } from 'react-router-dom';
import getLoginState from '../utils/getLoginState';

interface ProtectedRoutProps {
  roles: string[];
}

const PrivateRoute = (props: ProtectedRoutProps) => {
  const { rememberMe, accessToken, validUntil, role } = useAppSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (
      getLoginState(rememberMe, accessToken, validUntil) !== 'AUTHENTICATED'
    ) {
      // unauthorized
      // 명시적으로 로그인하지 않은 사용자
      navigate('/auth/sign-in');
    }

    if (!role || (role && props.roles.indexOf(role) < 0)) {
      // forbidden
      navigate('/auth/sign-in');
    }
  }, [rememberMe, accessToken, validUntil]);

  return <Outlet />;
};

export default PrivateRoute;
