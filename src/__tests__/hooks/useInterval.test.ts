import useInterval from '../../hooks/useInterval';
import { act, renderHook } from '@testing-library/react';

describe('useInterval', () => {
  test('start stop', () => {
    const { result } = renderHook(() => {
      return useInterval({
        initialRemaining: 3,
        lap: 1000,
        endTask: () => {
          console.log('end task');
        },
      });
    });

    act(() => {
      result.current.start();
    });

    expect(result.current.id).toBeTruthy();
    console.log(result.current);
  });
});
