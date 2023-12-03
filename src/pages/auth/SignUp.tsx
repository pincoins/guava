import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { GoSync } from 'react-icons/go';
import { MdPersonAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import className from 'classnames';
import EmailVerificationCode from '../../components/forms/EmailVerificationCode';
import EmailVerificationSend from '../../components/forms/EmailVerificationSend';
import PasswordConfirm from '../../components/forms/PasswordConfirm';
import useEmailVerification from '../../hooks/useEmailVerification';
import { useGoogleRecaptcha } from '../../hooks/useGoogleRecaptcha';
import useInterval from '../../hooks/useInterval';
import {
  useSendEmailCodeMutation,
  useSendEmailVerificationMutation,
  useSignUpMutation,
} from '../../store/services/authApi';
import Button from '../../widgets/Button';
import Panel from '../../widgets/panel/Panel';
import PanelHeading from '../../widgets/panel/PanelHeading';
import PanelBody from '../../widgets/panel/PanelBody';
import Divider from '../../widgets/Divider';

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
    code: yup
      .string()
      .matches(/^[0-9]{6}$/, '6자리 숫자를 정확하게 입력해주세요.'),
  })
  .required();

const SignUp = () => {
  // 1. 리덕스 스토어 객체 가져오기
  // 2. 리액트 라우터 네비게이션 객체 가져오기
  const navigate = useNavigate();

  // 3. RTK Query 객체 가져오기
  const [signUp] = useSignUpMutation();

  const [sendEmailVerification] = useSendEmailVerificationMutation();

  const [sendEmailCode] = useSendEmailCodeMutation();

  // 4. 리액트 훅 폼 정의
  const formMethods = useForm<SignUpForm>({
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
    state: timerState,
    start: timerStart,
    terminate: timerTerminate,
  } = useInterval({
    initialRemaining: parseInt(`${process.env.EMAIL_VERIFICATION_TIMEOUT}`),
    lap: parseInt(`${process.env.EMAIL_VERIFICATION_LAP}`),
    endTask: () => {
      // useEffect() cleanup 코드 동작 때문에 state.remaining 값을 신뢰할 수 없음
      // 직접 시간 경과/만료 여부 재계산

      const emailVerified = sessionStorage.getItem('emailVerified');
      const emailSentAt = sessionStorage.getItem('emailSentAt');
      const emailIsVerified = sessionStorage.getItem('emailIsVerified');

      if (
        emailIsVerified !== null &&
        !JSON.parse(emailIsVerified) &&
        emailVerified &&
        emailSentAt
      ) {
        const duration =
          parseInt(`${process.env.EMAIL_VERIFICATION_TIMEOUT}`) -
          Math.floor(
            (new Date().getTime() - new Date(emailSentAt).getTime()) / 1000
          );

        if (duration <= 0) {
          dispatchEmailVerification({
            type: 'ERROR',
            error: 'EXPIRED',
          });
          // 인증번호 입력 만료 시 username 이메일 필드 폼 검증 에러 처리
          formMethods.setError('username', {
            type: 'EXPIRED',
            message: '인증번호 입력시간이 초과했습니다.',
          });
        }
      }
    },
  });

  // 6. onValid 폼 제출 핸들러
  const onValid: SubmitHandler<SignUpForm> = async (data, _) => {
    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        await signUp({
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
    const emailVerified = sessionStorage.getItem('emailVerified');
    const emailSentAt = sessionStorage.getItem('emailSentAt');
    const emailIsVerified = sessionStorage.getItem('emailIsVerified');

    if (emailIsVerified !== null && emailVerified && emailVerified) {
      if (JSON.parse(emailIsVerified)) {
        formMethods.setValue('username', emailVerified, {
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
          formMethods.setValue('username', emailVerified, {
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

  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      console.log(emailVerification, timerState);
    }, [emailVerification, timerState]);
  }

  // 8. 이벤트 핸들러
  const handleSendEmailVerification = async (
    _: React.MouseEvent<HTMLElement>
  ) => {
    console.log('send click', emailVerification, timerState);

    await validateUsernameAndCaptcha()
      .then(({ username, captcha }) => {
        sendEmailVerification({
          username,
          captcha,
        })
          .unwrap()
          .then(({ success }) => {
            if (success) {
              // 상태변경 - 인증번호 만료 시 재발송 처리
              if (
                emailVerification.status === 'PENDING' ||
                (emailVerification.status === 'ERROR' &&
                  emailVerification.error === 'EXPIRED')
              ) {
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
              formMethods.setError('username', {
                type: 'INVALID_RECAPTCHA',
                message: '크롬, 엣지, 사파리 등 일반 브라우저로 접속바랍니다.',
              });
            } else if (data.message === 'Duplicated email address') {
              dispatchEmailVerification({
                type: 'ERROR',
                error: 'DUPLICATED',
              });
              formMethods.setError('username', {
                type: 'DUPLICATED',
                message: '이미 등록된 이메일 주소입니다.',
              });
            } else if (data.message === 'Email already sent') {
              dispatchEmailVerification({
                type: 'ERROR',
                error: 'ALREADY_SENT',
              });
              formMethods.setError('username', {
                type: 'ALREADY_SENT',
                message: '이메일이 이미 발송되었습니다.',
              });
            }
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSendEmailCode = async (_: React.MouseEvent<HTMLElement>) => {
    const { invalid, isDirty, isTouched } = formMethods.getFieldState('code');

    // 인증번호 필드가 변경되고 나서 그 값이 유효한지 확인
    if (!isDirty || !isTouched || invalid) {
      dispatchEmailVerification({
        type: 'ERROR',
        error: 'INVALID_CODE',
      });
      formMethods.setError('code', {
        type: 'INVALID_CODE',
        message: '인증번호가 올바르지 않습니다.',
      });
      return; // throw 해도 catch 해줄 곳이 없음
    }

    const code = formMethods.getValues('code') as string;

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
              formMethods.setError('code', {
                type: 'INVALID_CODE',
                message: '인증번호가 올바르지 않습니다.',
              });
            }
          })
          .catch(() => {
            formMethods.setError('code', {
              type: 'INVALID_CODE',
              message: '인증번호가 올바르지 않습니다.',
            });
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
    // 인증코드 입력 시간 만료 시 에러 상태이므로 에러를 지우기 위해 다시 검증
    await formMethods.trigger('username');

    const { invalid } = formMethods.getFieldState('username');

    if (invalid) {
      dispatchEmailVerification({
        type: 'ERROR',
        error: 'INVALID_EMAIL',
      });
      formMethods.setError('code', {
        type: 'INVALID_EMAIL',
        message: '이메일주소가 올바르지 않습니다.',
      });
      throw new Error('Invalid email address');
    }

    const username = formMethods.getValues('username');

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
    formMethods.setError('code', {
      type: 'INVALID_RECAPTCHA',
      message: '크롬, 엣지, 사파리 등 일반 브라우저로 접속바랍니다.',
    });
    throw new Error('Google reCAPTCHA element not found');
  };

  // 9. JSX 반환
  return (
    <Panel shadow rounded className="sm:w-1/2 flex flex-col gap-y-2 px-8 py-4">
      <PanelHeading>
        <h3 className="text-lg font-semibold text-[#e88f2f] text-center">
          회원가입
        </h3>
        <p className="text-sm text-gray-500 text-center">
          핀코인 회원가입을 환영합니다.
        </p>
      </PanelHeading>
      <Divider />
      <PanelBody>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onValid)}
            className="grid grid-cols-1 gap-6"
          >
            <div className="grid grid-cols-1 gap-y-1.5">
              <div
                className={className(
                  'rounded-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset',
                  !formMethods.formState.errors.fullName
                    ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                    : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                )}
              >
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium text-gray-900 mb-0.5"
                >
                  이름
                </label>
                <input
                  type="text"
                  {...formMethods.register('fullName', {
                    required: true,
                    onChange: (_) => {
                      if (formMethods.formState.errors.fullName) {
                        formMethods.clearErrors('fullName');
                      }
                    },
                  })}
                  className={className(
                    'block w-full border-0 focus:ring-0 p-0',
                    !formMethods.formState.errors.fullName
                      ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                      : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
                  )}
                  placeholder="OOO"
                />
              </div>
              {formMethods.formState.errors.fullName && (
                <p className="ml-2 text-sm text-red-600">
                  <span>{formMethods.formState.errors.fullName.message}</span>
                </p>
              )}
            </div>

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
                remaining={timerState.remaining}
                onClick={handleSendEmailCode}
              />
            )}

            <PasswordConfirm />

            <Button
              type="submit"
              disabled={formMethods.formState.isSubmitting}
              className="font-semibold py-2"
              preset="primary"
              inline
              center
              rounded="full"
            >
              {formMethods.formState.isSubmitting ? (
                <GoSync className="animate-spin" />
              ) : (
                <MdPersonAdd />
              )}
              회원가입
            </Button>
            {reCaptchaElement}
          </form>
        </FormProvider>
      </PanelBody>
    </Panel>
  );
};

export default SignUp;
