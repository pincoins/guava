import ContainerFixed from '../widgets/ContainerFixed';
import Skeleton from '../widgets/Skeleton';

const Home = () => {
  return (
    <ContainerFixed className="flex flex-col p-2 md:p-0 md:justify-center">
      <div>오늘의 최저가상품권</div>
      <div>상품권 금융사기 예방 수칙</div>
      <div>공지사항</div>
      <div>이용후기</div>
      <div>베스트셀러</div>
      <Skeleton className="h-10 w-full" times={3} />
    </ContainerFixed>
  );
};

export default Home;
