import { Link } from 'react-router-dom';
import React from 'react';

const UpperNavbar = () => {
  return (
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
  );
};

export default UpperNavbar;
