import { useReducer } from 'react';

export type Status = 'PENDING' | 'SENT' | 'COMPLETED' | 'ERROR';

export type Error =
  | 'INVALID_EMAIL'
  | 'INVALID_RECAPTCHA'
  | 'ALREADY_SENT'
  | 'DUPLICATED'
  | 'EXPIRED'
  | 'INVALID_CODE'
  | null;

export type VerificationState = {
  status: Status;
  error: Error;
  code: string;
  timeout: number;
};

export type VerificationAction =
  | { type: 'SENT' }
  | { type: 'COMPLETED' }
  | { type: 'RESET' }
  | { type: 'RELOADED'; timeout: number }
  | { type: 'CODE'; code: string }
  | { type: 'ERROR'; error: Error };

const initialState: VerificationState = {
  status: 'PENDING',
  error: null,
  code: '',
  timeout: 300,
};

const reducer = (
  state: VerificationState,
  action: VerificationAction
): VerificationState => {
  switch (action.type) {
    case 'SENT':
      if (state.status === 'PENDING') {
        return {
          ...state,
          status: 'SENT',
        };
      }
      return state;
    case 'COMPLETED':
      if (state.status === 'SENT') {
        return {
          ...state,
          status: 'COMPLETED',
          error: null,
          code: '',
        };
      }
      return state;
    case 'RELOADED':
      return {
        status: 'SENT',
        error: null,
        code: '',
        timeout: action.timeout,
      };
    case 'RESET':
      return initialState;
    case 'CODE':
      if (
        state.status === 'SENT' ||
        (state.status === 'ERROR' && state.error === 'INVALID_CODE')
      ) {
        return {
          ...state,
          status: 'SENT',
          error: null,
          code: action.code,
        };
      }
      return state;
    case 'ERROR':
      return {
        ...state,
        status: 'ERROR',
        error: action.error,
      };
    default:
      return state;
  }
};

const UseEmailVerification = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};

export default UseEmailVerification;
