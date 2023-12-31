import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { setCredentials, signOut } from '../slices/authSlice';
import { RootState } from '../index';
import { Mutex } from 'async-mutex';
import { TokenResponse } from '../../types';
import { clearCart } from '../slices/cartSlice';

const mutex = new Mutex();

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: process.env.API_ENDPOINT_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryForRefresh = fetchBaseQuery({
  baseUrl: process.env.API_ENDPOINT_URL,
  credentials: 'include',
});

const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // await pause(1000);

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQueryWithToken(args, api, extraOptions);

  // refresh only if access token does not exist (unauthorized: 401)
  if (result.error && (result.error.status as number) === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // const refreshToken = localStorage.getItem('refreshToken');

        const response: QueryReturnValue<
          unknown,
          FetchBaseQueryError,
          FetchBaseQueryMeta
        > = await baseQueryForRefresh(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: {
              grantType: 'refresh_token',
            },
          },
          api,
          extraOptions
        );
        if (response.data) {
          const { accessToken, refreshToken, expiresIn } =
            response.data as TokenResponse;

          api.dispatch(
            setCredentials({
              accessToken,
              refreshToken,
              expiresIn,
            })
          );

          // retry the initial query
          result = await baseQueryWithToken(args, api, extraOptions);
          return result;
        } else {
          // refresh token is also expired or invalid.
          api.dispatch(signOut());
          api.dispatch(clearCart());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithToken(args, api, extraOptions);
    }
  }
  return result;
};

export default baseQueryWithRetry;
