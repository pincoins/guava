import {
  MdInfoOutline,
  MdLogin,
  MdLogout,
  MdOutlineSettings,
  MdPersonAdd,
  MdSendToMobile,
} from 'react-icons/md';

const authenticated = [
  {
    id: 1,
    title: '마이페이지',
    to: '/auth/profile',
    icon: MdOutlineSettings,
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
    title: '주문/발송',
    to: '/shop/orders',
    icon: MdSendToMobile,
  },
  {
    id: 2,
    title: '고객센터',
    to: '/help/faq',
    icon: MdInfoOutline,
  },
];

export { authenticated, unauthenticated, menu };
