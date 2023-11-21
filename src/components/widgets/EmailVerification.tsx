import React, { Dispatch } from 'react';
import { VerificationAction } from '../../hooks/useEmailVerification';

const EmailVerification = ({
  code,
  dispatch,
  onClick,
  ...rest
}: {
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
        onChange={(e) => {
          dispatch({
            type: 'CODE',
            code: e.target.value,
          });
        }}
      />
      <button type="button" onClick={onClick}>
        인증번호 입력
      </button>
    </>
  );
};

export default EmailVerification;
