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

const mutex = new Mutex();

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: process.env.API_URL,
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
  baseUrl: process.env.API_URL,
  credentials: 'include',
});

const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQueryWithToken(args, api, extraOptions);

  // if refreshed, forbidden = 403 occurs.
  if (result.error && [401, 403].includes(result.error.status as number)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // const refreshToken = localStorage.getItem('refreshToken');

        const response: QueryReturnValue<
          any,
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
          const {
            data: { accessToken, refreshToken, expiresIn },
          } = response;

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
