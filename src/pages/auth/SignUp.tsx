import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useQueryMutationError } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  useSendVerificationEmailMutation,
  useSignUpMutation,
} from '../../store/services/authApi';
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

  const [
    signUp,
    { isError: signUpIsError, error: signUpError, isSuccess: signUpIsSuccess },
  ] = useSignUpMutation();

  const [
    sendVerificationEmail,
    {
      isError: sendVerificationEmailIsError,
      error: sendVerificationEmailError,
      isSuccess: sendVerificationEmailIsSuccess,
    },
  ] = useSendVerificationEmailMutation();

  const {
    register,
    getValues,
    getFieldState,
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

  // pending, sent(duplicated, expired, invalid) completed
  const [emailVerification, setEmailVerification] = useState('pending');
  // sent but error occurred: duplicated, expired, invalid
  const [emailVerificationError, setEmailVerificationError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }

    if (signUpIsSuccess) {
      navigate('/auth/sign-in');
    }

    useQueryMutationError(signUpIsError, signUpError);
  }, [accessToken, signUpIsSuccess, signUpIsError]);

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

  const handleSendEmailVerification = async (
    _: React.MouseEvent<HTMLElement>
  ) => {
    const { invalid, isDirty, isTouched } = getFieldState('username');

    if (!isDirty || !isTouched || invalid) {
      return; // clicked but invalid email address
    }

    const username = getValues('username');

    if (!reCaptcha || !reCaptcha.current) {
      return; // google recaptcha element not found
    }

    const captcha = await reCaptcha.current.executeAsync();

    if (!captcha) {
      return; // failed to get google recaptcha code
    }

    await sendVerificationEmail({ username, captcha });

    // 3분이 지나면 만료 처리

    if (sendVerificationEmailIsSuccess) {
      setEmailVerification('completed');
      setEmailVerificationError(null);
    }

    return;
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
          validate: {
            duplicated: (value) => {
              return (
                (emailVerification !== 'completed' &&
                  emailVerificationError === 'duplicated') ||
                '이미 등록된 이메일 주소입니다.'
              );
            },
            expired: (value) => {
              return (
                (emailVerification !== 'completed' &&
                  emailVerificationError === 'expired') ||
                '인증번호 입력 시간이 초과되었습니다.'
              );
            },
            invalid: (value) => {
              return (
                (emailVerification !== 'completed' &&
                  emailVerificationError === 'invalid') ||
                '인증번호가 올바르지 않습니다.'
              );
            },
          },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <button
        type="button"
        onClick={handleSendEmailVerification}
        disabled={emailVerification !== 'pending'}
      >
        인증메일 발송
      </button>
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
      </button>
      <ReCAPTCHA
        ref={reCaptcha}
        size="invisible" // v3
        sitekey={siteKey}
      />
    </form>
  );
};

export default SignUp;
