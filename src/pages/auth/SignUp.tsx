import React, { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useQueryMutationError } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../store/services/authApi';
import { TbLoader2 } from 'react-icons/tb';
import ReCAPTCHA from 'react-google-recaptcha';

interface SignUpForm {
  username: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .email('이메일 주소가 올바르지 않습니다.')
      .required('필수'),
    fullName: yup
      .string()
      .min(2, '최소 2자 이상 입력해주세요.')
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

  const [signUp, { isError, error, isSuccess }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      fullName: '',
      password: '',
      passwordRepeat: '',
    },
    resolver: yupResolver(schema),
  });

  const reCaptcha = useRef<ReCAPTCHA>(null);
  const siteKey: string = process.env.GOOGLE_RECAPTCHA_SITE_KEY as string;

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }

    if (isSuccess) {
      navigate('/auth/sign-in');
    }

    useQueryMutationError(isError, error);
  }, [accessToken, isSuccess, isError]);

  const onValid: SubmitHandler<SignUpForm> = async (data, _) => {
    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        await signUp({
          username: data.username,
          fullName: data.fullName,
          password: data.password,
          captcha,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="이름"
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
      <input
        type="password"
        placeholder="비밀번호 확인"
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
      <button
        type="submit"
        className="border inline-flex items-center"
        disabled={isSubmitting}
      >
        {isSubmitting && <TbLoader2 className="-mt-1 animate-spin" />}
        <span className="ml-1">회원가입</span>
        <ReCAPTCHA
          ref={reCaptcha}
          size="invisible" // v3
          sitekey={siteKey}
        />
      </button>
    </form>
  );
};

export default SignUp;
