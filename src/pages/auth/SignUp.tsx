import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  useSendEmailCodeMutation,
  useSendEmailVerificationMutation,
  useSignUpMutation,
} from '../../store/services/authApi';
import { TbLoader2 } from 'react-icons/tb';
import { useGoogleRecaptcha } from '../../hooks/useGoogleRecaptcha';
import useEmailVerification from '../../hooks/useEmailVerification';

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
  // 1. 리덕스 스토어 객체 가져오기
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  // 2. 리액트 라우터 네비게이션 객체 가져오기
  const navigate = useNavigate();

  // 3. RTK Query 객체 가져오기
  const [signUp] = useSignUpMutation();

  const [sendEmailVerification] = useSendEmailVerificationMutation();

  const [sendEmailCode] = useSendEmailCodeMutation();

  // 4. 리액트 훅 폼 정의
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

  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [reCaptcha, reCaptchaElement] = useGoogleRecaptcha();

  const [emailVerification, dispatchEmailVerification] = useEmailVerification();

  // 6. onValid 폼 제출 핸들러
  const onValid: SubmitHandler<SignUpForm> = async (data, _) => {
    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        signUp({
          username: data.username,
          fullName: data.fullName,
          password: data.password,
          captcha,
        })
          .unwrap()
          .then((fulfilled) => {
            console.log(fulfilled);

            navigate('/auth/sign-in');
          })
          .catch((rejected) => {
            console.error(rejected);
          });
      }
    }
  };

  // 7. useEffect
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  // 8. 이벤트 핸들러
  const handleSendEmailVerification = async (
    _: React.MouseEvent<HTMLElement>
  ) => {
    const results = await validateUsernameAndCaptcha();

    if (results === false) {
      return;
    }

    console.log(emailVerification.code);
    console.log(results.username);
    console.log(results.captcha);

    sendEmailVerification({
      username: results.username,
      captcha: results.captcha,
    })
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
        dispatchEmailVerification({ type: 'SENT' });
      })
      .catch((rejected) => {
        if (rejected.data.message === 'Invalid reCAPTCHA') {
          dispatchEmailVerification({
            type: 'ERROR',
            error: 'INVALID_RECAPTCHA',
          });
        } else if (rejected.data.message === 'Duplicated email address') {
          dispatchEmailVerification({
            type: 'ERROR',
            error: 'DUPLICATED',
          });
        } else if (rejected.data.message === 'Email already sent') {
          dispatchEmailVerification({
            type: 'ERROR',
            error: 'ALREADY_SENT',
          });
        }
      });

    // 3분이 지나면 만료 처리
    return;
  };

  const handleSendEmailCode = async (_: React.MouseEvent<HTMLElement>) => {
    const results = await validateUsernameAndCaptcha();

    if (results === false) {
      return;
    }

    console.log(emailVerification.code);
    console.log(results.username);
    console.log(results.captcha);
  };

  const validateUsernameAndCaptcha: () => Promise<
    false | { captcha: string; username: string }
  > = async () => {
    const { invalid, isDirty, isTouched } = getFieldState('username');

    if (!isDirty || !isTouched || invalid) {
      return false; // clicked but invalid email address
    }

    const username = getValues('username');

    if (!reCaptcha || !reCaptcha.current) {
      return false; // google recaptcha element not found
    }

    const captcha = await reCaptcha.current.executeAsync();

    if (!captcha) {
      dispatchEmailVerification({
        type: 'ERROR',
        error: 'INVALID_RECAPTCHA',
      });
      return false; // failed to get google recaptcha code
    }

    return { username, captcha };
  };

  // 9. JSX 반환
  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col w-1/2">
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
            error: (_) => {
              if (emailVerification.value !== 'COMPLETED') {
                switch (emailVerification.error) {
                  case 'INVALID_RECAPTCHA':
                    return '다른 브라우저에서 시도해주세요.';
                  case 'DUPLICATED':
                    return '이미 등록된 이메일 주소입니다.';
                  case 'ALREADY_SENT':
                    return '인증메일이 이미 발송되었습니다.';
                  case 'EXPIRED':
                    return '인증번호 입력 시간이 초과되었습니다.';
                  case 'INVALID_CODE':
                    return '인증번호가 올바르지 않습니다.';
                }
              }
            },
          },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <button
        type="button"
        onClick={handleSendEmailVerification}
        disabled={emailVerification.value !== 'PENDING'}
      >
        인증메일 발송
      </button>

      <input
        type="text"
        name="emailVerificationCode"
        value={emailVerification.code}
        placeholder="000000"
        onChange={(e) => {
          dispatchEmailVerification({
            type: 'CODE',
            code: e.target.value,
          });
        }}
      />
      <button type="button" onClick={handleSendEmailCode}>
        인증번호 입력
      </button>
      <p>
        오류메시지: / value: {emailVerification.value} / error:
        {emailVerification.error} / code: {emailVerification.code}
      </p>

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
      {reCaptchaElement}
    </form>
  );
};

export default SignUp;
