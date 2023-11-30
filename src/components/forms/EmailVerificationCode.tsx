import React, { Dispatch } from 'react';

import { useFormContext } from 'react-hook-form';
import className from 'classnames';
import { SignUpForm } from '../../pages/auth/SignUp';
import Button from '../../widgets/Button';
import {
  VerificationAction,
  VerificationState,
} from '../../hooks/useEmailVerification';
import { MdOutlineKeyboardAlt } from 'react-icons/md';

const EmailVerificationCode = ({
  state,
  dispatch,
  remaining,
  onClick,
}: {
  state: VerificationState;
  dispatch: Dispatch<VerificationAction>;
  remaining: number;
  onClick: (_: React.MouseEvent<HTMLElement>) => Promise<void>;
}) => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpForm>(); // retrieve all hook methods

  const editable =
    state.status === 'SENT' ||
    (state.status === 'ERROR' && state.error === 'INVALID_CODE');

  return (
    <>
      <div className="flex flex-col gap-y-1.5">
        <div className="flex">
          <div
            className={className(
              'rounded-tl-md rounded-bl-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset relative',
              !errors.code
                ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            )}
          >
            <label
              htmlFor="code"
              className="block text-xs font-medium text-gray-900 mb-0.5"
            >
              인증번호&nbsp;
              {remaining &&
                '[' +
                  new Date(remaining * 1000).toISOString().substring(14, 19) +
                  ']'}
            </label>
            <input
              type="text"
              minLength={6}
              maxLength={6}
              placeholder="000000"
              readOnly={!editable}
              {...register('code', {
                required: false,
                onChange: (_) => {
                  if (errors.code) {
                    clearErrors('code');
                  }

                  if (editable) {
                    dispatch({ type: 'SENT' });
                  }
                },
              })}
              className={className(
                'block w-full border-0 focus:ring-0 p-0',
                !errors.code
                  ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                  : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
              )}
            />
          </div>
          <Button
            type="button"
            onClick={onClick}
            inline
            center
            preset={errors.code ? 'danger' : 'secondary'}
            className="font-semibold relative w-24 rounded-br-md rounded-tr-md"
            disabled={state.status !== 'SENT'}
          >
            <MdOutlineKeyboardAlt /> 입력
          </Button>
        </div>

        {errors.code && (
          <p className="ml-2 text-sm text-red-600">
            <span>{errors.code.message}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default EmailVerificationCode;
