import React, { Dispatch } from 'react';
import {
  VerificationAction,
  VerificationState,
} from '../../hooks/useEmailVerification';
import { useFormContext } from 'react-hook-form';
import { SignUpForm } from '../../pages/auth/SignUp';
import IconTextButton from '../../widgets/buttons/IconTextButton';

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
      />
      <IconTextButton
        type="button"
        onClick={onClick}
        disabled={state.status !== 'SENT'}
      >
        인증번호 입력
      </IconTextButton>
    </>
  );
};

export default EmailVerificationCode;
