import { useReducer } from 'react';

type State = 'PENDING' | 'SENT' | 'COMPLETED';

type Error =
  | 'INVALID_RECAPTCHA'
  | 'ALREADY_SENT'
  | 'DUPLICATED'
  | 'EXPIRED'
  | 'INVALID_CODE'
  | null;

type VerificationState = {
  value: State;
  error: Error;
  code: string;
};

type VerificationAction =
  | { type: 'SENT' }
  | { type: 'CODE'; code: string }
  | { type: 'ERROR'; error: Error }
  | { type: 'RESET' };

const initialState: VerificationState = {
  value: 'PENDING',
  error: null,
  code: '',
};

function reducer(
  state: VerificationState,
  action: VerificationAction
): VerificationState {
  switch (action.type) {
    case 'SENT':
      return {
        ...state,
        value: 'SENT',
      };
    case 'CODE':
      return {
        ...state,
        value: 'SENT',
        code: action.code,
      };
    case 'ERROR':
      return {
        ...state,
        value: 'SENT',
        error: action.error,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const UseEmailVerification = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};

export default UseEmailVerification;
