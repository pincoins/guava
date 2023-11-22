import React, { Dispatch } from 'react';
import {
  VerificationAction,
  VerificationState,
} from '../../hooks/useEmailVerification';

const EmailVerificationCode = ({
  state,
  dispatch,
  onClick,
  ...rest
}: {
  state: VerificationState;
  dispatch: Dispatch<VerificationAction>;
  onClick: (_: React.MouseEvent<HTMLElement>) => Promise<void>;
}) => {
  return (
    <>
      <input
        type="text"
        name="emailVerificationCode"
        value={state.code}
        maxLength={6}
        placeholder="000000"
        disabled={
          !(
            state.status === 'SENT' ||
            (state.status === 'ERROR' && state.error === 'INVALID_CODE')
          )
        }
        onChange={(e) => {
          if (
            state.status === 'SENT' ||
            (state.status === 'ERROR' && state.error === 'INVALID_CODE')
          ) {
            dispatch({
              type: 'CODE',
              code: e.target.value,
            });
          }
        }}
      />
      <button
        type="button"
        onClick={onClick}
        disabled={state.status !== 'SENT'}
      >
        인증번호 입력
      </button>
    </>
  );
};

export default EmailVerificationCode;
