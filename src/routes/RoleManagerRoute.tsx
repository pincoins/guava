import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';

const RoleManagerRoute = () => {
  const { role } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  if (!role || ['SYSADMIN', 'STAFF'].includes(role)) {
    // forbidden
    navigate('/auth/sign-in');
  }

  return <Outlet />;
};

export default RoleManagerRoute;
