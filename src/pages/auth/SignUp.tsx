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
    fullName: yup
      .string()
      .min(2, '최소 2자 이상 입력해주세요.')
      .required('필수'),
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
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password')], '확인 비밀번호가 일치하지 않습니다.')
      .required('필수'),
  })
  .required();

const SignUp = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const [signUp, { isLoading, isError, error, isSuccess }] =
    useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    clearErrors,
    reset,
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
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
  }, [accessToken, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // 폼 전송 완료 후 필드 초기화
    }
  }, [isSubmitSuccessful]);

  const onValid: SubmitHandler<SignUpForm> = (data, _) => {
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
      <button type="button">중복확인</button>
      <input
        type="text"
        placeholder="fullName"
        className="border"
        {...register('fullName', {
          required: true,
          onChange: (_) => {
            if (errors.fullName) {
              clearErrors('fullName');
            }
          },
        })}
      />
      {errors.fullName && <span>{errors.fullName.message}</span>}
      <input
        type="text"
        placeholder="email"
        className="border"
        {...register('email', {
          required: true,
          onChange: (_) => {
            if (errors.email) {
              clearErrors('email');
            }
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="password"
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
      <input
        type="password"
        placeholder="password repeat"
        className="border"
        {...register('passwordRepeat', {
          required: true,
          onChange: (_) => {
            if (errors.passwordRepeat) {
              clearErrors('passwordRepeat');
            }
          },
        })}
      />
      {errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}
      <button type="submit" className="border" disabled={isLoading}>
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
