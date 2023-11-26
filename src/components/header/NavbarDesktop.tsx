import className from 'classnames';
import {
  MdInfoOutline,
  MdLogin,
  MdLogout,
  MdPersonAdd,
  MdPersonPin,
  MdSendToMobile,
  MdShoppingBag,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { Category } from '../../store/models/interfaces';
import { useFetchCategoriesQuery } from '../../store/services/categoryApi';
import getLoginState from '../../utils/getLoginState';
import ContainerFixed from '../../widgets/ContainerFixed';

const NavbarDesktop = ({ ...rest }) => {
  const { rememberMe, accessToken, validUntil } = useAppSelector(
    (state: RootState) => state.auth
  );

  const classes = className(rest.className, 'hidden md:flex md:flex-col');

  const { data, error, isFetching } = useFetchCategoriesQuery();

  let content;

  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>error occurred.</div>;
  } else {
    content = data?.map((category: Category) => {
      return (
        <Link to={`/shop/categories/${category.slug}`} key={category.slug}>
          {category.title}
        </Link>
      );
    });
  }

  // 데스크탑 메뉴 (fluid 기본값)
  return (
    <div className={classes}>
      {/* fluid 크기로 배경색 주기 위해 ContainerFixed 감싸기. */}
      <div className="bg-white">
        <ContainerFixed className="px-2 py-2">
          <div className="flex justify-between">
            <div className="font-bold">
              <Link to="/">
                <img
                  src={process.env.LOGO_DESKTOP}
                  alt={process.env.SITE_TITLE}
                />
              </Link>
            </div>
            <div className="flex-none flex gap-x-4">
              <Link
                to="/shop/orders"
                className="inline-flex items-center gap-x-1"
              >
                <MdSendToMobile />
                <span>주문발송</span>
              </Link>
              <Link
                to="/shop/cart"
                className="inline-flex items-center gap-x-1"
              >
                <MdShoppingBag />
                <span>장바구니</span>
              </Link>
              <Link to="/help/qna" className="inline-flex items-center gap-x-1">
                <MdInfoOutline />
                <span>고객센터</span>
              </Link>
              {getLoginState(rememberMe, accessToken, validUntil) ===
                'UNAUTHENTICATED' && (
                <>
                  <Link
                    to="/auth/sign-in"
                    className="inline-flex items-center gap-x-1"
                  >
                    <MdLogin />
                    <span>로그인</span>
                  </Link>
                  <Link
                    to="/auth/sign-up"
                    className="inline-flex items-center gap-x-1"
                  >
                    <MdPersonAdd />
                    <span>회원가입</span>
                  </Link>
                </>
              )}
              {getLoginState(rememberMe, accessToken, validUntil) ===
                ('AUTHENTICATED' || 'EXPIRED') && (
                <>
                  <Link
                    to="/auth/profile"
                    className="inline-flex items-center gap-x-1"
                  >
                    <MdPersonPin />
                    <span>마이페이지</span>
                  </Link>
                  <Link
                    to="/auth/sign-out"
                    className="inline-flex items-center gap-x-1"
                  >
                    <MdLogout />
                    <span>로그아웃</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </ContainerFixed>
      </div>
      <div className="bg-green-50 text-green-950">
        <ContainerFixed className="px-2 py-2">
          <div className="flex flex-row justify-between">{content}</div>
        </ContainerFixed>
      </div>
    </div>
  );
};

export default NavbarDesktop;
