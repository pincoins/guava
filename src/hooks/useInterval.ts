import { useCallback, useEffect, useReducer, useRef } from 'react';

export type Status = 'READY' | 'RUNNING' | 'PAUSED' | 'REMAINING';

export type IntervalState = {
  status: Status;
  remaining: number;
};

export type IntervalAction =
  | { type: 'START'; remaining: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TERMINATE' }
  | { type: 'TICK' };

const DEFAULT_REMAINING = 180; // 3분
const DEFAULT_LAP = 1000; // 1초
const DEFAULT_TERMINATE = 0;

const reducer = (
  state: IntervalState,
  action: IntervalAction
): IntervalState => {
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
        remaining: DEFAULT_TERMINATE,
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
          remaining: DEFAULT_TERMINATE,
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

const useInterval = ({
  initialRemaining = DEFAULT_REMAINING,
  lap = DEFAULT_LAP,
  beginTask = undefined,
  endTask = undefined,
}: {
  initialRemaining: number;
  lap: number;
  beginTask?: () => void | undefined;
  endTask?: () => void | undefined;
}) => {
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
        if (endTask !== undefined) {
          endTask();
        }

        clearInterval(id.current);
      }
    };
  }, [dispatch, status, initialRemaining, lap]);

  const start = useCallback(
    (remaining?: number) => {
      dispatch({
        type: 'START',
        remaining: remaining ? remaining : initialRemaining,
      });

      if (beginTask !== undefined) {
        beginTask();
      }
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

export default useInterval;
