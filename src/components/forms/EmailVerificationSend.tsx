import React, { Dispatch } from 'react';
import {
  VerificationAction,
  VerificationState,
} from '../../hooks/useEmailVerification';
import { useFormContext } from 'react-hook-form';
import className from 'classnames';
import { SignUpForm } from '../../pages/auth/SignUp';
import Button from '../../widgets/Button';
import { MdOutlineMailLock } from 'react-icons/md';

const EmailVerificationSend = ({
  state,
  dispatch,
  onClick,
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
      <div className="flex flex-col gap-y-1.5">
        <div className="flex">
          <div
            className={className(
              'rounded-tl-md rounded-bl-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset relative',
              !errors.username
                ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            )}
          >
            <label
              htmlFor="username"
              className="block text-xs font-medium text-gray-900 mb-0.5"
            >
              이메일
            </label>
            <input
              type="email"
              readOnly={state.status === 'SENT'}
              {...register('username', {
                required: true,
                onChange: (_) => {
                  if (errors.username) {
                    clearErrors('username');
                  }

                  if (
                    state.status === 'COMPLETED' ||
                    state.status === 'ERROR'
                  ) {
                    sessionStorage.removeItem('emailVerified');
                    sessionStorage.removeItem('emailSentAt');
                    sessionStorage.removeItem('emailIsVerified');

                    dispatch({ type: 'RESET' });
                  }
                },
              })}
              className={className(
                'block w-full border-0 focus:ring-0 p-0',
                !errors.username
                  ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                  : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
              )}
              placeholder="username@example.com"
            />
          </div>
          <Button
            type="button"
            onClick={onClick}
            inline
            center
            preset={errors.username ? 'danger' : 'secondary'}
            className="font-semibold relative w-24 rounded-br-md rounded-tr-md"
            disabled={
              !(
                state.status === 'PENDING' ||
                (state.status === 'ERROR' && state.error === 'EXPIRED')
              )
            }
          >
            <MdOutlineMailLock /> 인증
          </Button>
        </div>

        {errors.username && (
          <p className="ml-2 text-sm text-red-600">
            <span>{errors.username.message}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default EmailVerificationSend;
