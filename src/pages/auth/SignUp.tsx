import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUp } from '../../store/thunks/authActions';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

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
  const { error, loading, accessToken, registered } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      navigate('/auth/sign-in');
    }

    if (accessToken) {
      navigate('/');
    }
  }, [registered, accessToken]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      signUp({
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div>{error}</div>}
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
      <input type="submit" className="border" disabled={loading} />
    </form>
  );
};

export default SignUp;
