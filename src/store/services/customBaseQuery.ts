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

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: process.env.API_URL,
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
});

const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithToken(args, api, extraOptions);

  if (result.error && [401, 403].includes(result.error.status as number)) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
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
            refreshToken,
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
        result = await baseQueryWithToken(args, api, extraOptions);
        return result;
      } else {
        api.dispatch(signOut());
      }
    }
  }
  return result;
};

export default baseQueryWithRetry;
