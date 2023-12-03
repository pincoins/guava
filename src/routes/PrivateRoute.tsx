import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';

const PrivateRoute = () => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!['AUTHENTICATED', 'EXPIRED'].includes(loginState)) {
      navigate('/auth/sign-in');
    }
  }, [loginState, navigate]);

  return <Outlet />;
};

export default PrivateRoute;
