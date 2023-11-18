import { createApi } from '@reduxjs/toolkit/query/react';
import { TokenResponse } from '../models/interfaces';
import { setCredentials, signOut } from '../slices/authSlice';
import customBaseQuery from './customBaseQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<
      any,
      { username: string; fullName: string; password: string; captcha: string }
    >({
      query: (data) => {
        return {
          url: '/members',
          method: 'POST',
          body: data,
        };
      },
    }),
    signIn: builder.mutation<
      TokenResponse,
      {
        username: string;
        password: string;
        captcha: string;
      }
    >({
      query: (data) => {
        return {
          url: '/auth/authenticate',
          method: 'POST',
          body: { ...data, grantType: 'password' },
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken, refreshToken, expiresIn },
          } = await queryFulfilled;

          dispatch(
            setCredentials({
              accessToken,
              refreshToken,
              expiresIn,
            })
          );
        } catch (error) {}
      },
    }),
    signOut: builder.mutation<void, void>({
      query: () => {
        return {
          url: '/auth/refresh',
          method: 'DELETE',
        };
      },
      async onQueryStarted(args, { dispatch }) {
        try {
          dispatch(signOut());
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
  authApi;

export { authApi };
