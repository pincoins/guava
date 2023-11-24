import React from 'react';
import Skeleton from '../widgets/Skeleton';

const Home = () => {
  return (
    <>
      <div>오늘의 최저가상품권</div>
      <div>상품권 금융사기 예방 수칙</div>
      <div>공지사항</div>
      <div>이용후기</div>
      <div>베스트셀러</div>
      <Skeleton className="h-10 w-full" times={3} />
    </>
  );
};

export default Home;
