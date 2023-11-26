import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import getLoginState from '../utils/getLoginState';

const PrivateRoute = () => {
  const { rememberMe, accessToken, validUntil } = useAppSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (
      getLoginState(rememberMe, accessToken, validUntil) !== 'AUTHENTICATED'
    ) {
      navigate('/auth/sign-in');
    }
  }, [rememberMe, accessToken, validUntil]);

  return <Outlet />;
};

export default PrivateRoute;
