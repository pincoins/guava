import { SubmitHandler, useForm } from 'react-hook-form';
import { GoSync } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import { useSignOutMutation } from '../../store/services/authApi';
import Button from '../../widgets/Button';
import React from 'react';
import ContainerFixed from '../../widgets/ContainerFixed';
import Panel from '../../widgets/Panel';
import PanelTitle from '../../widgets/PanelTitle';

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
    <ContainerFixed className="flex p-2 md:p-0 md:justify-center">
      <Panel
        shadow
        rounded
        className="md:w-1/2 flex flex-col gap-y-2 px-8 py-4"
      >
        <PanelTitle>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            로그아웃
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            개인정보보호를 위해 서비스를 이용하지 않을 때는 로그아웃하세요.
          </p>
        </PanelTitle>
        <div className="w-full">
          <form onSubmit={handleSubmit(onValid)}>
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              inline
              preset="danger"
              className="font-semibold w-full justify-center"
            >
              {isSubmitting ? (
                <GoSync className="animate-spin" />
              ) : (
                <MdLogout />
              )}
              로그아웃
            </Button>
          </form>
        </div>
      </Panel>
    </ContainerFixed>
  );
};

export default SignOut;
