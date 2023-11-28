import React, { Dispatch } from 'react';

import { useFormContext } from 'react-hook-form';
import className from 'classnames';
import { SignUpForm } from '../../pages/auth/SignUp';
import Button from '../../widgets/Button';
import {
  VerificationAction,
  VerificationState,
} from '../../hooks/useEmailVerification';

const EmailVerificationCode = ({
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

  const editable =
    state.status === 'SENT' ||
    (state.status === 'ERROR' && state.error === 'INVALID_CODE');

  return (
    <>
      <div className="flex flex-col gap-y-1.5">
        <div
          className={className(
            'rounded-md shadow-sm w-full border-0 px-3 pb-1.5 pt-2.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset',
            !errors.code
              ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
              : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
          )}
        >
          <label
            htmlFor="code"
            className="block text-xs font-medium text-gray-900 mb-1"
          >
            인증번호
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
        {errors.code && (
          <p className="ml-2 text-sm text-red-600">
            <span>{errors.code.message}</span>
          </p>
        )}
      </div>

      <Button
        type="button"
        onClick={onClick}
        disabled={state.status !== 'SENT'}
        preset="primary"
        className="text-sm font-semibold"
      >
        인증번호 입력
      </Button>
    </>
  );
};

export default EmailVerificationCode;
