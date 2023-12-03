import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PublicRoute = () => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginState !== 'UNAUTHENTICATED') {
      navigate('/');
    }
  }, [loginState, navigate]);

  return <Outlet />;
};

export default PublicRoute;
