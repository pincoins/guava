import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
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
import useInterval from '../../hooks/useInterval';
import EmailVerificationCode from '../../components/widgets/EmailVerificationCode';
import EmailVerificationSend from '../../components/widgets/EmailVerificationSend';

export interface SignUpForm {
  username: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
  code?: string;
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
    code: yup.string().matches(/^[0-9]{6}$/),
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
  const methods = useForm<SignUpForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      fullName: '',
      password: '',
      passwordRepeat: '',
      code: '',
    },
    resolver: yupResolver(schema),
  });

  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [reCaptcha, reCaptchaElement] = useGoogleRecaptcha();

  const [emailVerification, dispatchEmailVerification] = useEmailVerification();

  const {
    remaining: timerRemaining,
    status: timerStatus,
    start: timerStart,
    terminate: timerTerminate,
  } = useInterval({
    initialRemaining: parseInt(`${process.env.EMAIL_VERIFICATION_TIMEOUT}`),
    lap: parseInt(`${process.env.EMAIL_VERIFICATION_LAP}`),
    endTask: () => {
      if (emailVerification.status === 'SENT' && timerRemaining <= 0) {
        dispatchEmailVerification({
          type: 'ERROR',
          error: 'EXPIRED',
        });
      }
    },
  });

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
          .then((_) => {
            sessionStorage.removeItem('emailVerified');
            sessionStorage.removeItem('emailSentAt');
            sessionStorage.removeItem('emailIsVerified');

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

  useEffect(() => {
    const emailVerified = sessionStorage.getItem('emailVerified');
    const emailSentAt = sessionStorage.getItem('emailSentAt');
    const emailIsVerified = sessionStorage.getItem('emailIsVerified');

    if (emailIsVerified !== null && emailVerified && emailVerified) {
      if (JSON.parse(emailIsVerified)) {
        methods.setValue('username', emailVerified, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });

        dispatchEmailVerification({
          type: 'COMPLETED',
        });
      } else if (emailVerified && emailSentAt) {
        const duration =
          parseInt(`${process.env.EMAIL_VERIFICATION_TIMEOUT}`) -
          Math.floor(
            (new Date().getTime() - new Date(emailSentAt).getTime()) / 1000
          );

        if (
          duration < parseInt(`${process.env.EMAIL_VERIFICATION_TIMEOUT}`) &&
          duration > 0
        ) {
          methods.setValue('username', emailVerified, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });

          dispatchEmailVerification({
            type: 'RELOADED',
            timeout: duration,
          });

          timerStart(duration);
        }
      }
    }
  }, []);

  // 8. 이벤트 핸들러
  const handleSendEmailVerification = async (
    _: React.MouseEvent<HTMLElement>
  ) => {
    await validateUsernameAndCaptcha()
      .then(({ username, captcha }) => {
        sendEmailVerification({
          username,
          captcha,
        })
          .unwrap()
          .then(({ success }) => {
            if (success) {
              // 상태변경
              if (emailVerification.status === 'PENDING') {
                dispatchEmailVerification({ type: 'SENT' });
              }

              // 타이머 시작
              timerStart();

              // 세션스토리지 저장
              const sentAt = new Date();
              sentAt.setSeconds(sentAt.getSeconds());

              sessionStorage.setItem('emailVerified', username);
              sessionStorage.setItem('emailSentAt', `${sentAt}`);
              sessionStorage.setItem('emailIsVerified', `${false}`);
            }
          })
          .catch(({ data }) => {
            if (data.message === 'Invalid reCAPTCHA') {
              dispatchEmailVerification({
                type: 'ERROR',
                error: 'INVALID_RECAPTCHA',
              });
            } else if (data.message === 'Duplicated email address') {
              dispatchEmailVerification({
                type: 'ERROR',
                error: 'DUPLICATED',
              });
            } else if (data.message === 'Email already sent') {
              dispatchEmailVerification({
                type: 'ERROR',
                error: 'ALREADY_SENT',
              });
            }
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSendEmailCode = async (_: React.MouseEvent<HTMLElement>) => {
    const { invalid, isDirty, isTouched } = methods.getFieldState('code');

    // 인증번호 필드를 변경하고 나서 그 값이 유효한지 확인
    if (!isDirty || !isTouched || invalid) {
      dispatchEmailVerification({
        type: 'ERROR',
        error: 'INVALID_CODE',
      });
      return; // throw 해도 catch 해줄 곳이 없음
    }

    const code = methods.getValues('code') as string;

    await validateUsernameAndCaptcha()
      .then(({ username, captcha }) => {
        sendEmailCode({
          username,
          captcha,
          code,
        })
          .unwrap()
          .then(({ success }) => {
            if (success) {
              if (emailVerification.status === 'SENT') {
                // 상태변경
                dispatchEmailVerification({ type: 'COMPLETED' });
              }

              // 타이머 종료
              timerTerminate();

              // 세션스토리지 저장
              sessionStorage.setItem('emailIsVerified', `${true}`);
            } else {
              dispatchEmailVerification({
                type: 'ERROR',
                error: 'INVALID_CODE',
              });
            }
          })
          .catch(({ data }) => {
            console.error(data);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const validateUsernameAndCaptcha: () => Promise<{
    captcha: string;
    username: string;
  }> = async () => {
    const { invalid, isDirty, isTouched } = methods.getFieldState('username');

    // 이메일 필드를 변경하고 나서 그 값이 유효한지 확인
    if (!isDirty || !isTouched || invalid) {
      dispatchEmailVerification({
        type: 'ERROR',
        error: 'INVALID_EMAIL',
      });
      throw new Error('Invalid email address');
    }

    const username = methods.getValues('username');

    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();
      if (captcha) {
        return { username, captcha };
      }
    }

    dispatchEmailVerification({
      type: 'ERROR',
      error: 'INVALID_RECAPTCHA',
    });
    throw new Error('Google reCAPTCHA element not found');
  };

  // 9. JSX 반환
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onValid)}
        className="flex flex-col w-1/2"
      >
        <input
          type="text"
          placeholder="이름"
          className="border"
          {...methods.register('fullName', {
            required: true,
            onChange: (_) => {
              if (methods.formState.errors.fullName) {
                methods.clearErrors('fullName');
              }
            },
          })}
        />
        {methods.formState.errors.fullName && (
          <span>{methods.formState.errors.fullName.message}</span>
        )}

        <EmailVerificationSend
          state={emailVerification}
          dispatch={dispatchEmailVerification}
          onClick={handleSendEmailVerification}
        />

        {(emailVerification.status === 'SENT' ||
          (emailVerification.status === 'ERROR' &&
            emailVerification.error === 'INVALID_CODE')) && (
          <EmailVerificationCode
            state={emailVerification}
            dispatch={dispatchEmailVerification}
            onClick={handleSendEmailCode}
          />
        )}
        <p>
          오류메시지: timer: {timerStatus} / {timerRemaining} / status:
          <span>{emailVerification.status}</span>/ error:
          <span>{emailVerification.error}</span>
        </p>
        <input
          type="password"
          placeholder="비밀번호"
          className="border"
          {...methods.register('password', {
            required: true,
            onChange: (_) => {
              if (methods.formState.errors.password) {
                methods.clearErrors('password');
              }
            },
          })}
        />
        {methods.formState.errors.password && (
          <span>{methods.formState.errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="border"
          {...methods.register('passwordRepeat', {
            required: true,
            onChange: (_) => {
              if (methods.formState.errors.passwordRepeat) {
                methods.clearErrors('passwordRepeat');
              }
            },
          })}
        />
        {methods.formState.errors.passwordRepeat && (
          <span>{methods.formState.errors.passwordRepeat.message}</span>
        )}
        <button
          type="submit"
          className="border inline-flex items-center"
          disabled={methods.formState.isSubmitting}
        >
          {methods.formState.isSubmitting && (
            <TbLoader2 className="-mt-1 animate-spin" />
          )}
          <span className="ml-1">회원가입</span>
        </button>
        {reCaptchaElement}
      </form>
    </FormProvider>
  );
};

export default SignUp;
