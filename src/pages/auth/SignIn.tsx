import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../store/services/authApi';
import { useAppSelector, useQueryMutationError } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';

interface SignInForm {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
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
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const [signIn, { isLoading, isError, error, isSuccess }] =
    useSignInMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    clearErrors,
    reset,
  } = useForm<SignInForm>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }

    if (isSuccess) {
      navigate('/');
    }

    useQueryMutationError(isError, error);
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // 폼 전송 완료 후 필드 초기화
    }
  }, [isSubmitSuccessful]);

  // onChange 이벤트 커스터마이징 위해서 별도로 분리
  const email = register('email', { required: true });
  const password = register('password', { required: true });

  const onValid: SubmitHandler<SignInForm> = (data, _) => {
    signIn({ email: data.email, password: data.password });
  };

  const onInvalid: SubmitErrorHandler<SignInForm> = (errors, event) => {
    console.log('why?', errors, event);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        type="text"
        placeholder="email"
        className="border"
        {...email}
        onChange={(e) => {
          email.onChange(e).then((_) => {
            if (errors.email) {
              clearErrors('email');
            }
          });
        }}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="password"
        className="border"
        {...password}
        onChange={(e) => {
          password.onChange(e).then((_) => {
            if (errors.password) {
              clearErrors('password');
            }
          });
        }}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit" className="border" disabled={isLoading}>
        {isLoading && '로그인하는 중'}
        {!isLoading && '로그인'}
      </button>
    </form>
  );
};

export default SignIn;
