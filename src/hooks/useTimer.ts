import { useCallback, useEffect, useReducer, useRef } from 'react';

export type Status = 'READY' | 'RUNNING' | 'PAUSED' | 'REMAINING';

export type TimerState = {
  status: Status;
  remaining: number;
};

export type TimerAction =
  | { type: 'START'; remaining: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TERMINATE' }
  | { type: 'TICK' };

const reducer = (state: TimerState, action: TimerAction): TimerState => {
  const { status, remaining } = state;

  if (action.type === 'START') {
    if (status === 'READY') {
      return {
        ...state,
        status: 'RUNNING',
        remaining: action.remaining,
      };
    }
    return state;
  } else if (action.type === 'PAUSE') {
    if (status === 'RUNNING') {
      return {
        ...state,
        status: 'PAUSED',
      };
    }
    return state;
  } else if (action.type === 'RESUME') {
    if (status === 'PAUSED') {
      return {
        ...state,
        status: 'RUNNING',
      };
    }
    return state;
  } else if (action.type === 'TERMINATE') {
    if (status === 'RUNNING' || status === 'PAUSED') {
      return {
        ...state,
        status: 'READY',
        remaining: 0,
      };
    }
    return state;
  } else if (action.type === 'TICK') {
    if (status === 'RUNNING') {
      if (remaining < 1) {
        // 타임아웃 종료조건
        return {
          ...state,
          status: 'READY',
          remaining: 0,
        };
      } else {
        return {
          ...state,
          remaining: remaining - 1,
        };
      }
    }
    return state;
  } else {
    throw new Error();
  }
};

const useTimer = (initialRemaining = 300, lap = 1000) => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'READY', // ready, running, paused
    remaining: initialRemaining,
  });

  const { status, remaining } = state;

  const id = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status === 'RUNNING') {
      id.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, lap);
    }

    return () => {
      if (id.current !== null) {
        clearInterval(id.current);
      }
    };
  }, [dispatch, status, initialRemaining, lap]);

  const start = useCallback(
    (remaining: number) => {
      dispatch({
        type: 'START',
        remaining: remaining ? remaining : initialRemaining,
      });
    },
    [initialRemaining]
  );

  const terminate = useCallback(() => {
    dispatch({ type: 'TERMINATE' });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: 'RESUME' });
  }, []);

  return { id, remaining, status, start, terminate, pause, resume };
};

export default useTimer;
