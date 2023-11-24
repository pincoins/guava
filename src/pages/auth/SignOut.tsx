import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignOutMutation } from '../../store/services/authApi';
import { GoSync } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import Button from '../../widgets/Button';

const SignOut = () => {
  // 1. 리덕스 스토어 객체 가져오기
  // 2. 리액트 라우터 네비게이션 객체 가져오기

  // 3. RTK Query 객체 가져오기
  const [signOut] = useSignOutMutation();

  // 4. 리액트 훅 폼 정의
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{}>({});

  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)

  // 6. onValid 폼 제출 핸들러
  const onValid: SubmitHandler<{}> = async () => {
    await signOut()
      .unwrap()
      .then((_) => {})
      .catch((_) => {});
  };

  // 7. useEffect
  // 8. 이벤트 핸들러

  // 9. JSX 반환
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          inline
          preset="danger"
          className="text-sm font-semibold"
        >
          {isSubmitting ? <GoSync className="animate-spin" /> : <MdLogout />}
          로그아웃
        </Button>
      </form>
    </div>
  );
};

export default SignOut;
