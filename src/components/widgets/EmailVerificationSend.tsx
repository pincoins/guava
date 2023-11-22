import React, { Dispatch } from 'react';
import {
  VerificationAction,
  VerificationState,
} from '../../hooks/useEmailVerification';
import { useFormContext } from 'react-hook-form';
import { SignUpForm } from '../../pages/auth/SignUp';

const EmailVerificationSend = ({
  state,
  dispatch,
  onClick,
  ...rest
}: {
  state: VerificationState;
  dispatch: Dispatch<VerificationAction>;
  onClick: (_: React.MouseEvent<HTMLElement>) => Promise<void>;
}) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpForm>(); // retrieve all hook methods

  return (
    <>
      <input
        type="text"
        placeholder="이메일"
        className="border"
        readOnly={state.status === 'SENT'}
        {...register('username', {
          required: true,

          onChange: (_) => {
            if (errors.username) {
              clearErrors('username');
            }

            if (state.status === 'COMPLETED' || state.status === 'ERROR') {
              sessionStorage.removeItem('emailVerified');
              sessionStorage.removeItem('emailSentAt');
              sessionStorage.removeItem('emailIsVerified');

              dispatch({
                type: 'RESET',
              });
            }
          },
          validate: {
            error: (_) => {
              if (state.status !== 'COMPLETED') {
                switch (state.error) {
                  case 'INVALID_EMAIL':
                    return '이메일 형식이 올바르지 않습니다.';
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
        onClick={onClick}
        disabled={state.status !== 'PENDING'}
      >
        인증메일 발송
      </button>
    </>
  );
};

export default EmailVerificationSend;
