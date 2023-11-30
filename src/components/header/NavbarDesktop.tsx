import className from 'classnames';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import ContainerFixed from '../../widgets/ContainerFixed';
import { authenticated, menu, unauthenticated } from './navarItems';

const NavbarDesktop = ({ ...rest }) => {
  const { loginState } = useAppSelector((state: RootState) => state.auth);

  const classes = className(rest.className, 'flex flex-col');

  // 데스크탑 메뉴 (fluid 기본값)
  return (
    <div className={classes}>
      {/* fluid 크기로 배경색 주기 위해 ContainerFixed 감싸기. */}
      {/* 현재 메뉴 배경색은 Header 부모 컴포넌트에서 적용 중 */}
      <div className="">
        <ContainerFixed className="py-2">
          <div className="flex justify-between">
            <Link to="/" className="inline-flex items-center gap-x-1">
              <img
                src={process.env.SITE_LOGO}
                alt={process.env.SITE_TITLE}
                className="h-4 w-4"
              />
              <span className="text-xl font-bold whitespace-nowrap text-[#e88f2f]">
                {process.env.SITE_TITLE}
              </span>
            </Link>
            <div className="flex-none flex gap-x-4">
              {menu.map((item) => {
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="inline-flex gap-x-1 items-center"
                  >
                    {<item.icon />}
                    {item.title}
                  </Link>
                );
              })}
              {loginState === 'UNAUTHENTICATED' &&
                unauthenticated.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className="inline-flex gap-x-1 items-center"
                    >
                      {<item.icon />}
                      {item.title}
                    </Link>
                  );
                })}
              {loginState === ('AUTHENTICATED' || 'EXPIRED') &&
                authenticated.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      className="inline-flex gap-x-1 items-center"
                    >
                      {<item.icon />}
                      {item.title}
                    </Link>
                  );
                })}
            </div>
          </div>
        </ContainerFixed>
      </div>
    </div>
  );
};

export default NavbarDesktop;
