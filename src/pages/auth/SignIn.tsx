import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../store/services/authApi';
import { useQueryError } from '../../hooks/rtk-hooks';

interface Inputs {
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
  const [signIn, { isLoading, isError, error, isSuccess }] =
    useSignInMutation();

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
    if (isSuccess) {
      navigate('/');
    }

    useQueryError(isError, error);
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn({ email: data.email, password: data.password });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
};

export default SignIn;
