import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';
import { useEffect } from 'react';

const RoleManagerRoute = () => {
  const { loginState, role } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      loginState === 'EXPIRED' ||
      (loginState === 'AUTHENTICATED' &&
        role &&
        ['SYSADMIN', 'STAFF'].includes(role))
    ) {
      return;
    }

    navigate('/auth/sign-in');
  }, [loginState, role, navigate]);

  return <Outlet />;
};

export default RoleManagerRoute;
