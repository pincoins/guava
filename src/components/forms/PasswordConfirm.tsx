import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpForm } from '../../pages/auth/SignUp';

const PasswordConfirm = () => {
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<SignUpForm>(); // retrieve all hook methods

  return (
    <>
      <input
        type="password"
        placeholder="비밀번호"
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
    </>
  );
};

export default PasswordConfirm;
