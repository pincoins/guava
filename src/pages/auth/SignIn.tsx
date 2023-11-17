import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

  const navigate = useNavigate();

  const [signIn, { isError, error, isSuccess }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
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
  }, [accessToken, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // 폼 전송 완료 후 필드 초기화
    }
  }, [isSubmitSuccessful]);

  const onValid: SubmitHandler<SignInForm> = (data, _) => {
    signIn({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="email"
        className="border"
        {...register('email', {
          required: true,
          onChange: (_) => {
            if (errors.email) {
              clearErrors('email');
            }
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="password"
        className="border"
        {...register('password', {
          required: true,
          onChange: (_) => {
            if (errors.password) {
              clearErrors('password');
            }
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit" className="border" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
};

export default SignIn;
