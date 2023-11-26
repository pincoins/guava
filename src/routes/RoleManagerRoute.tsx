import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';

type ROLE_ALL = 'SYSADMIN' | 'STAFF' | 'MEMBER';
type ROLE_SYSADMIN = 'SYSADMIN';
type ROLE_MANAGER = 'SYSADMIN' | 'STAFF';
type ROLE_MEMBER = 'MEMBER';

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
