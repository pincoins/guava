import { useCallback, useState } from 'react';
import { AppDispatch } from '../store';
import { useAppDispatch } from '../store/hooks';
import { AsyncThunk } from '@reduxjs/toolkit';

export const useThunk = (thunk: AsyncThunk<any[], any, any>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch: AppDispatch = useAppDispatch();

  const runThunk = useCallback(
    (...arg: any[]) => {
      setLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, loading, error] as const;
};
