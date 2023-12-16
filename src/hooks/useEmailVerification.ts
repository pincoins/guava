import { useReducer } from 'react';
import { VerificationAction, VerificationState } from '../types';

const initialState: VerificationState = {
  status: 'PENDING',
  error: null,
  timeout: 300,
};

const reducer = (
  state: VerificationState,
  action: VerificationAction
): VerificationState => {
  switch (action.type) {
    case 'SENT':
      return {
        ...state,
        status: 'SENT',
        error: null,
      };

    case 'COMPLETED':
      return {
        ...state,
        status: 'COMPLETED',
        error: null,
      };

    case 'RELOADED':
      return {
        status: 'SENT',
        error: null,
        timeout: action.timeout,
      };

    case 'RESET':
      return initialState;

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

const useEmailVerification = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};

export default useEmailVerification;
