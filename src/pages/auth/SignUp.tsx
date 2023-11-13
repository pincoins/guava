import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/apis/authApi';

interface Inputs {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required(),
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const SignUp = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const [signUp, { isLoading, isError, error, isSuccess }] =
    useSignUpMutation();

  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }

    if (isSuccess) {
      navigate('/auth/sign-in');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => console.log(el.message));
      } else {
        console.log((error as any).data.message);
      }
    }
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
      {errors.username && <span>invalid username</span>}
      <input
        type="text"
        placeholder="fullName"
        className="border"
        {...register('fullName')}
      />
      {errors.fullName && <span>invalid email address</span>}
      <input
        type="text"
        placeholder="email"
        className="border"
        {...register('email')}
      />
      {errors.email && <span>invalid email address</span>}
      <input
        type="password"
        placeholder="password"
        className="border"
        {...register('password')}
      />
      {errors.password && <span>required</span>}
      <input type="submit" className="border" disabled={isLoading} />
    </form>
  );
};

export default SignUp;
