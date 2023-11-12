import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log('dispatch login async thunk');
  };

  return (
    // "handleSubmit" validates your input before invoking "onSubmit"
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="border" {...register('email')} />
      {errors.email && <span>invalid email address</span>}

      <input type="password" className="border" {...register('password')} />
      {errors.password && <span>required</span>}

      <input type="submit" className="border" />
    </form>
  );
};

export default SignIn;
