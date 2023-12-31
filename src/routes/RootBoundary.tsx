import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const RootBoundary = () => {
  const error = useRouteError();

  // 컴포넌트 렌더링 시점에 예외만 catch
  // 컴포넌트 렌더링 끝나고 런타임 예외 발생 시 "Uncaught runtime errors" 검빨 화면

  if (isRouteErrorResponse(error)) {
    // 리액트 라우터 수준 에러 핸들링
    if (error.status === 400) {
      return <div>잘못된 요청 파라미터</div>;
    }

    if (error.status === 401) {
      return <div>로그인하지 않음</div>;
    }

    if (error.status === 403) {
      return <div>권한 없음</div>;
    }

    if (error.status === 409) {
      return <div>충돌</div>;
    }

    if (error.status === 503) {
      return <div>백엔드 API 오류</div>;
    }
  } else if (error instanceof Error) {
    // throw new Error('메시지'); 에러 핸들링
    return <div>{error.message}</div>;
  }

  return <div>서버에 문제가 있습니다. 관리자에게 연락바랍니다.</div>;
};

export default RootBoundary;
