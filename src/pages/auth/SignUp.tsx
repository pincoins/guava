import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useQueryError } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/services/authApi';

interface Inputs {
  username: string;
  fullName: string;
  email: string;
  password: string;
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
        '비밀번호 형식이 올바르지 않습니다.'
      )
      .required('필수'),
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
  } = useForm<Inputs>({
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

    useQueryError(isError, error);
  }, [isLoading, accessToken]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signUp({
      username: data.username,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="username"
        className="border"
        {...register('username')}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <input
        type="text"
        placeholder="fullName"
        className="border"
        {...register('fullName')}
      />
      {errors.fullName && <span>{errors.fullName.message}</span>}
      <input
        type="text"
        placeholder="email"
        className="border"
        {...register('email')}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="password"
        className="border"
        {...register('password')}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input type="submit" className="border" disabled={isLoading} />
    </form>
  );
};

export default SignUp;
