import { Link } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../hooks/rtk-hooks';
import { RootState } from '../store';

const UpperNavbar = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <Link to="/">{process.env.SITE_TITLE} 로고</Link>
      </div>
      <div>
        <Link to="/shop/categories">카테고리</Link>
      </div>
      <div>
        <Link to="/help/qna">고객문의</Link>
      </div>
      {!accessToken && (
        <>
          <div>
            <Link to="/auth/sign-in">로그인</Link>
          </div>
          <div>
            <Link to="/auth/sign-up">회원가입</Link>
          </div>
        </>
      )}
      {accessToken && (
        <>
          <div>
            <Link to="/auth/profile">마이페이지</Link>
          </div>
          <div>
            <Link to="/auth/sign-out">로그아웃</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UpperNavbar;
