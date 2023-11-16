import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQueryMutationError = (
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (isError && error) {
    console.log(error);
    if ('status' in error) {
      // `FetchBaseQueryError`: ERR_CONNECTION_REFUSED; FETCH_ERROR;
      console.log(error.status);
    } else if (Array.isArray((error as any).data?.error)) {
      // `ApiErrorResponse` from backend
      (error as any).data.error.forEach((el: any) => console.log(el.message));
    } else {
      // SerializedError`
      console.log(error.message);
    }
  }
};
