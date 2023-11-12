import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { authenticate } from '../../store/thunks/authActions';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const SignIn = () => {
  const { error, loading } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(authenticate({ email: data.email, password: data.password }));
  };

  return (
    // "handleSubmit" validates your input before invoking "onSubmit"
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="border" {...register('email')} />
      {errors.email && <span>invalid email address</span>}

      <input type="password" className="border" {...register('password')} />
      {errors.password && <span>required</span>}

      <input type="submit" className="border" disabled={loading} />
      {error}
    </form>
  );
};

export default SignIn;
