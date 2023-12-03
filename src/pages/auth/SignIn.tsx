import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoSync } from 'react-icons/go';
import { MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import className from 'classnames';
import { useGoogleRecaptcha } from '../../hooks/useGoogleRecaptcha';
import { useSignInMutation } from '../../store/services/authApi';
import Button from '../../widgets/Button';
import React, { useState } from 'react';
import Panel from '../../widgets/panel/Panel';
import PanelHeading from '../../widgets/panel/PanelHeading';
import Modal from '../../widgets/Modal';
import PanelBody from '../../widgets/panel/PanelBody';
import Divider from '../../widgets/Divider';

export interface SignInForm {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .email('이메일 주소가 올바르지 않습니다.')
      .required('필수'),
    password: yup
      .string()
      .min(5, '비밀번호는 최소 5자입니다.')
      .required('필수'),
  })
  .required();

const SignIn = () => {
  // 1. 리덕스 스토어 객체 가져오기

  // 2. 리액트 라우터 네비게이션 객체 가져오기
  const navigate = useNavigate();

  // 3. RTK Query 객체 가져오기
  const [signIn] = useSignInMutation();

  // 4. 리액트 훅 폼 정의
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignInForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [reCaptcha, reCaptchaElement] = useGoogleRecaptcha();

  // 6. onValid 폼 제출 핸들러
  const onValid: SubmitHandler<SignInForm> = async (data, _) => {
    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        await signIn({
          username: data.username,
          password: data.password,
          captcha,
        })
          .unwrap()
          .then((_) => {
            navigate('/');
          })
          .catch((rejected) => {
            console.error(rejected);
            handleModalOpen();
          });
      }
    }
  };

  // 7. useEffect
  const [isOpen, setIsOpen] = useState(false);

  // 8. 이벤트 핸들러
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // 9. JSX 반환
  return (
    <>
      <Panel
        shadow
        rounded
        className="sm:w-1/2 flex flex-col gap-y-2 px-8 py-4"
      >
        <PanelHeading>
          <h3 className="text-lg font-semibold text-[#e88f2f] text-center">
            로그인
          </h3>
        </PanelHeading>
        <Divider />
        <PanelBody>
          <form
            onSubmit={handleSubmit(onValid)}
            className="grid grid-cols-1 gap-6"
          >
            <div className="grid grid-cols-1 gap-y-1.5">
              <div
                className={className(
                  'rounded-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset',
                  !errors.username
                    ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                    : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                )}
              >
                <label
                  htmlFor="username"
                  className="block text-xs font-medium text-gray-900 mb-0.5"
                >
                  이메일
                </label>
                <input
                  type="email"
                  {...register('username', {
                    required: true,
                    onChange: (_) => {
                      if (errors.username) {
                        clearErrors('username');
                      }
                    },
                  })}
                  className={className(
                    'block w-full border-0 focus:ring-0 p-0',
                    !errors.username
                      ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                      : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                  )}
                  placeholder="username@example.com"
                />
              </div>
              {errors.username && (
                <p className="ml-2 text-sm text-red-600">
                  <span>{errors.username.message}</span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-1.5">
              <div
                className={className(
                  'rounded-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset',
                  !errors.password
                    ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                    : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                )}
              >
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-900 mb-0.5"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    onChange: (_) => {
                      if (errors.password) {
                        clearErrors('password');
                      }
                    },
                  })}
                  className={className(
                    'block w-full border-0 focus:ring-0 p-0',
                    !errors.password
                      ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                      : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                  )}
                  placeholder="********"
                />
              </div>
              {errors.password && (
                <p className="ml-2 text-sm text-red-600">
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold py-2"
              preset="primary"
              inline
              center
              rounded="full"
            >
              {isSubmitting ? <GoSync className="animate-spin" /> : <MdLogin />}
              로그인
            </Button>
            {reCaptchaElement}
          </form>
        </PanelBody>
      </Panel>
      <Modal
        title={'로그인 실패'}
        messages={['이메일 주소 또는 비밀번호가 올바르지 않습니다.']}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default SignIn;
