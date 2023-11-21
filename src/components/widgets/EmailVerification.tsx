import React, { Dispatch } from 'react';
import { VerificationAction } from '../../hooks/useEmailVerification';

const EmailVerification = ({
  status,
  code,
  dispatch,
  onClick,
  ...rest
}: {
  status: string;
  code: string;
  dispatch: Dispatch<VerificationAction>;
  onClick: (_: React.MouseEvent<HTMLElement>) => Promise<void>;
}) => {
  return (
    <>
      <input
        type="text"
        name="emailVerificationCode"
        value={code}
        maxLength={6}
        placeholder="000000"
        disabled={status !== 'SENT'}
        onChange={(e) => {
          dispatch({
            type: 'CODE',
            code: e.target.value,
          });
        }}
      />
      <button type="button" onClick={onClick} disabled={status !== 'SENT'}>
        인증번호 입력
      </button>
    </>
  );
};

export default EmailVerification;
