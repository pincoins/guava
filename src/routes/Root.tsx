import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const products = [
  {
    slug: '구글',
    name: '구글기프트카드',
  },
  {
    slug: '넥슨카드',
    name: '넥슨카드',
  },
  {
    slug: '컬쳐랜드상품권',
    name: '컬쳐랜드상품권',
  },
  {
    slug: '해피머니',
    name: '해피머니',
  },
  {
    slug: '도서문화상품권',
    name: '도서문화상품권',
  },
  {
    slug: '문화상품권',
    name: '문화상품권',
  },
  {
    slug: '스마트문화상품권',
    name: '스마트문화상품권',
  },
  {
    slug: '에그머니',
    name: '에그머니',
  },
  {
    slug: '틴캐시',
    name: '틴캐시',
  },
  {
    slug: '요기요',
    name: '요기요',
  },
  {
    slug: '아프리카별풍선',
    name: '아프리카별풍선',
  },
  {
    slug: '플레이스테이션',
    name: '플레이스테이션',
  },
  {
    slug: 'N코인',
    name: 'N코인',
  },
  {
    slug: '와우캐시',
    name: '와우캐시',
  },
  {
    slug: '한게임',
    name: '한게임',
  },
  {
    slug: '퍼니카드',
    name: '퍼니카드',
  },
  {
    slug: '매니아선불쿠폰',
    name: '매니아선불쿠폰',
  },
  {
    slug: '아이템베이선불쿠폰',
    name: '아이템베이선불쿠폰',
  },
];

const Root = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>
          <Link to="/">{process.env.SITE_TITLE} 로고</Link>
        </div>
        <div>
          <Link to="/auth/sign-in">로그인</Link>
        </div>
        <div>
          <Link to="/auth/sign-up">회원가입</Link>
        </div>
        <div>
          <Link to="/auth/profile">마이페이지</Link>
        </div>
        <div>
          <Link to="/auth/sign-out">로그아웃</Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {products.map((product) => {
          return (
            <Link to={`/shop/products/${product.slug}`} key={product.slug}>
              {product.name}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
