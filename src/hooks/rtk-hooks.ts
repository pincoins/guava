import { useCallback, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
