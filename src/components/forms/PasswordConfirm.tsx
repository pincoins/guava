import React from 'react';
import { useFormContext } from 'react-hook-form';
import className from 'classnames';
import { SignUpForm } from '../../pages/auth/SignUp';

const PasswordConfirm = () => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpForm>(); // retrieve all hook methods

  return (
    <>
      <div className="flex flex-col gap-y-1.5">
        <div
          className={className(
            'rounded-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset',
            !errors.password
              ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
              : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
          )}
        >
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-900 mb-0.5"
          >
            비밀번호
          </label>
          <input
            type="password"
            {...register('password', {
              required: true,
              onChange: (_) => {
                if (errors.password) {
                  clearErrors('password');
                }
              },
            })}
            className={className(
              'block w-full border-0 focus:ring-0 p-0',
              !errors.password
                ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            )}
            placeholder="********"
          />
        </div>
        {errors.password && (
          <p className="ml-2 text-sm text-red-600">
            <span>{errors.password.message}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-y-1.5">
        <div
          className={className(
            'rounded-md shadow-sm w-full border-0 px-2 pb-0.5 pt-1.5 ring-1 ring-inset focus-within:ring-1 focus-within:ring-inset',
            !errors.passwordRepeat
              ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
              : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
          )}
        >
          <label
            htmlFor="passwordRepeat"
            className="block text-xs font-medium text-gray-900 mb-0.5"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            {...register('passwordRepeat', {
              required: true,
              onChange: (_) => {
                if (errors.passwordRepeat) {
                  clearErrors('passwordRepeat');
                }
              },
            })}
            className={className(
              'block w-full border-0 focus:ring-0 p-0',
              !errors.passwordRepeat
                ? 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
                : 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
            )}
            placeholder="********"
          />
        </div>
        {errors.passwordRepeat && (
          <p className="ml-2 text-sm text-red-600">
            <span>{errors.passwordRepeat.message}</span>
          </p>
        )}
      </div>
    </>
  );
};

export default PasswordConfirm;
