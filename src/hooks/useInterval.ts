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
      // state.remaining > 0 조건일 경우 +1초 추가 구간 반복
      if (state.status === 'RUNNING' && state.remaining > 1) {
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
    // setup 함수
    // - 초기 마운트 시점에 수행
    if (state.status === 'RUNNING' && id.current === null) {
      id.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, lap);
    }

    // cleanup 함수
    // - 마운트 해제 시점에 수행
    // - 의존성 배열에 포함된 변수가 변경되면 컴포넌트 리렌더링 -> cleanup 함수 실행 ->
    // setup 함수 실행
    // cleanup 함수 내부에서는 변경 이전 값을 참조하므로
    // state.remaining === initialRemaining
    return () => {
      if (id.current !== null) {
        clearInterval(id.current);

        id.current = null;
        if (endTask !== undefined) {
          endTask();
        }
      }
    };
  }, [state.status, lap]);

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
