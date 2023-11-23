import useInterval from '../../hooks/useInterval';
import { act, renderHook } from '@testing-library/react';

describe('useInterval', () => {
  test('start stop', () => {
    const { result } = renderHook(() => {
      return useInterval({
        initialRemaining: 3,
        lap: 1000,
        endTask: () => {},
      });
    });

    jest.useFakeTimers();

    expect(result.current.id.current).toBeNull();
    expect(result.current.state.status).toBe('READY');
    expect(result.current.state.remaining).toBe(3);

    act(() => {
      result.current.start();
    });

    expect(result.current.state.status).toBe('RUNNING');

    act(() => {
      // 주기적으로 TICK 리듀서 액션 dispatch 실행으로 상태 변경 side effect 발생
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.state.status).toBe('READY');
    expect(result.current.state.remaining).toBe(0);
  });
});
