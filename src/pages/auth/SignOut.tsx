import { SubmitHandler, useForm } from 'react-hook-form';
import { GoSync } from 'react-icons/go';
import { MdLogout } from 'react-icons/md';
import { useSignOutMutation } from '../../store/apis/authApi';
import Button from '../../widgets/Button';
import React from 'react';
import Panel from '../../widgets/panel/Panel';
import PanelHeading from '../../widgets/panel/PanelHeading';
import PanelBody from '../../widgets/panel/PanelBody';
import Divider from '../../widgets/Divider';

const SignOut = () => {
  // 1. URL 파라미터 가져오기
  // 2. 리덕스 스토어 객체 가져오기
  // 3. 리액트 라우터 네비게이션 객체 가져오기

  // 4. RTK Query 객체 가져오기
  const [signOut] = useSignOutMutation();

  // 5. 리액트 훅 폼 정의
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Record<never, never>>();

  // 6. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  // 7. useEffect 호출
  // 8. onValid 폼 제출 핸들러 정의
  const onValid: SubmitHandler<Record<never, never>> = async () => {
    await signOut()
      .unwrap()
      .then((_) => {})
      .catch((_) => {});
  };

  // 9. 이벤트 핸들러 정의
  // 10. 출력 데이터 구성
  // 11. JSX 반환
  return (
    <div className="flex flex-1 justify-center">
      <Panel
        shadow
        rounded
        className="flex flex-col w-full sm:w-1/2 gap-y-2 px-2 py-4"
      >
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f] text-center">
            로그아웃
          </h3>
          <p className="text-sm text-gray-500 text-center">
            개인정보보호를 위해 서비스를 이용하지 않을 때는 로그아웃하세요.
          </p>
        </PanelHeading>
        <Divider className="mt-3 mb-4" />
        <PanelBody>
          <form
            onSubmit={handleSubmit(onValid)}
            className="grid grid-cols-1 gap-6"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold py-2"
              preset="danger"
              inline
              center
              rounded="full"
            >
              {isSubmitting ? (
                <GoSync className="animate-spin" />
              ) : (
                <MdLogout />
              )}
              로그아웃
            </Button>
          </form>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default SignOut;
