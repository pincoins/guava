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
  switch (action.type) {
    case 'START':
      if (state.status === 'READY') {
        return {
          status: 'RUNNING',
          remaining: action.remaining,
        };
      }
      return state;

    case 'PAUSE':
      if (state.status === 'RUNNING') {
        return {
          ...state,
          status: 'PAUSED',
        };
      }
      return state;

    case 'RESUME':
      if (state.status === 'PAUSED') {
        return {
          ...state,
          status: 'RUNNING',
        };
      }
      return state;

    case 'TERMINATE':
      if (state.status === 'RUNNING' || state.status === 'PAUSED') {
        return {
          status: 'READY',
          remaining: DEFAULT_TERMINATE,
        };
      }
      return state;

    case 'TICK':
      if (state.status === 'RUNNING' && state.remaining > 0) {
        return {
          ...state,
          remaining: state.remaining - 1,
        };
      }
      return {
        status: 'READY',
        remaining: DEFAULT_TERMINATE,
      };

    default:
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

  const id = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.status === 'RUNNING' && id.current == null) {
      id.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, lap);
    }

    return () => {
      // state.remaining === initialRemaining

      if (id.current !== null) {
        clearInterval(id.current);
        id.current = null;
        if (endTask !== undefined) {
          endTask();
        }
      }
    };
  }, [state.status]);

  const start = useCallback(
    (remainingArg?: number) => {
      dispatch({
        type: 'START',
        remaining: remainingArg ? remainingArg : initialRemaining,
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

  return { id, state, start, terminate, pause, resume };
};

export default useInterval;
