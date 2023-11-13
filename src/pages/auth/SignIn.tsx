import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../store/services/authApi';

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
  const [signIn, { isLoading, isError, error, isSuccess }] =
    useSignInMutation();

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
    if (isSuccess) {
      navigate('/');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) => console.log(el.message));
      } else {
        console.log((error as any).data.message);
      }
    }
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
    </>
  );
};

export default SignIn;
