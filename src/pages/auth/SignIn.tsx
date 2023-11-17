import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../store/services/authApi';
import { useAppSelector, useQueryMutationError } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { TbLoader2 } from 'react-icons/tb';

interface SignInForm {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup
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
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignInForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
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
  }, [accessToken, isSuccess, isError]);

  const onValid: SubmitHandler<SignInForm> = async (data, _) => {
    await signIn({ username: data.username, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="이메일"
        className="border"
        {...register('username', {
          required: true,
          onChange: (_) => {
            if (errors.username) {
              clearErrors('username');
            }
          },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <input
        type="password"
        placeholder="비밀번호"
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
      <button
        type="submit"
        className="border inline-flex items-center"
        disabled={isSubmitting}
      >
        {isSubmitting && <TbLoader2 className="-mt-1 animate-spin" />}
        <span className="ml-1">로그인</span>
      </button>
    </form>
  );
};

export default SignIn;
