import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useQueryMutationError } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/services/authApi';

interface SignUpForm {
  username: string;
  fullName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .matches(
        /^(?=.{3,32}$)(?![._-])(?!.*[._-]{2})[a-zA-Z0-9._-]+(?<![_.])$/,
        '아이디 형식이 올바르지 않습니다.'
      )
      .required('필수'),
    fullName: yup.string().required('필수'),
    email: yup
      .string()
      .email('이메일 주소가 올바르지 않습니다.')
      .required('필수'),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        '비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.'
      )
      .required('필수'),
    passwordRepeat: yup.string().required('필수'),
  })
  .required();

const SignUp = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const [signUp, { isLoading, isError, error, isSuccess }] =
    useSignUpMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
    setError,
    clearErrors,
    reset,
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }

    if (isSuccess) {
      navigate('/auth/sign-in');
    }

    useQueryMutationError(isError, error);
  }, [isLoading, accessToken]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      // 폼 전송 완료 후 필드 초기화
      reset();
    }
  }, [isSubmitSuccessful]);

  const onValid: SubmitHandler<SignUpForm> = (data, _) => {
    if (data.password !== data.passwordRepeat) {
      setError(
        'passwordRepeat',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true }
      );
      return;
    }

    signUp({
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="username"
        className="border"
        {...register('username')}
        onChange={() => {
          if (errors.username) {
            clearErrors('username');
          }
        }}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <input
        type="text"
        placeholder="fullName"
        className="border"
        {...register('fullName')}
        onChange={() => {
          if (errors.fullName) {
            clearErrors('fullName');
          }
        }}
      />
      {errors.fullName && <span>{errors.fullName.message}</span>}
      <input
        type="text"
        placeholder="email"
        className="border"
        {...register('email')}
        onChange={() => {
          if (errors.email) {
            clearErrors('email');
          }
        }}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="password"
        className="border"
        {...register('password')}
        onChange={() => {
          if (errors.password) {
            clearErrors('password');
          }
        }}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input
        type="password"
        placeholder="password repeat"
        className="border"
        {...register('passwordRepeat')}
      />
      {errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}
      <input type="submit" className="border" disabled={isLoading} />
    </form>
  );
};

export default SignUp;
