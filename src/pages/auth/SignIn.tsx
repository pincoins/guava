import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from '../../store/thunks/authActions';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface Inputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn = () => {
  const { error, loading, accessToken } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(signIn({ email: data.email, password: data.password }));
  };

  return (
    // "handleSubmit" validates your input before invoking "onSubmit"
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <div>{error}</div>}
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
    </>
  );
};

export default SignIn;
