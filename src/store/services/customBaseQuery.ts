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

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQuery1 = fetchBaseQuery({
  baseUrl: process.env.API_URL,
});

const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const response: QueryReturnValue<
        any,
        FetchBaseQueryError,
        FetchBaseQueryMeta
      > = await baseQuery1(
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
        result = await baseQuery(args, api, extraOptions);
        return result;
      }
    }
  }

  api.dispatch(signOut());
  return result;
};

export default baseQueryWithRetry;
