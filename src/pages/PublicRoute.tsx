import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { Outlet, useNavigate } from 'react-router-dom';
import getLoginState from '../utils/getLoginState';
import { useEffect } from 'react';

const PublicRoute = () => {
  const { rememberMe, accessToken, validUntil, role } = useAppSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (getLoginState(rememberMe, accessToken, validUntil) !== 'EXPIRED') {
      // 명시적으로 로그인하지 않은 사용자
      // already authorized
      navigate('/');
    }
  }, [rememberMe, accessToken, validUntil]);

  return <Outlet />;
};

export default PublicRoute;
