import {
  MdInfoOutline,
  MdLogin,
  MdLogout,
  MdOutlineArrowRight,
  MdPerson,
  MdPersonAdd,
  MdSendToMobile,
  MdShoppingBag,
} from 'react-icons/md';

const authenticated = [
  {
    id: 1,
    title: '마이페이지',
    to: '/auth/profile',
    icon: MdPerson,
  },
  {
    id: 2,
    title: '로그아웃',
    to: '/auth/sign-out',
    icon: MdLogout,
  },
];

const unauthenticated = [
  {
    id: 1,
    title: '로그인',
    to: '/auth/sign-in',
    icon: MdLogin,
  },
  {
    id: 2,
    title: '회원가입',
    to: '/auth/sign-up',
    icon: MdPersonAdd,
  },
];

const menu = [
  {
    id: 1,
    title: '장바구니',
    to: '/shop/cart',
    icon: MdShoppingBag,
  },
  {
    id: 2,
    title: '고객센터',
    to: '/help/faq',
    icon: MdInfoOutline,
  },
  {
    id: 3,
    title: '주문/발송',
    to: '/shop/orders',
    icon: MdSendToMobile,
  },
];

const products = [
  {
    id: 1,
    title: '구글기프트카드',
    to: '/shop/categories/구글',
    icon: MdOutlineArrowRight,
  },
  {
    id: 2,
    title: '넥슨카드',
    to: '/shop/categories/넥슨',
    icon: MdOutlineArrowRight,
  },
  {
    id: 3,
    title: '해피머니',
    to: '/shop/categories/해피',
    icon: MdOutlineArrowRight,
  },
  {
    id: 4,
    title: '컬쳐랜드상품권',
    to: '/shop/categories/컬쳐',
    icon: MdOutlineArrowRight,
  },
  {
    id: 5,
    title: '문화상품권',
    to: '/shop/categories/문화',
    icon: MdOutlineArrowRight,
  },
];

export { authenticated, unauthenticated, menu, products };
