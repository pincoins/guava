import { createApi } from '@reduxjs/toolkit/query/react';
import { TokenResponse } from '../models/interfaces';
import { setCredentials, signOut } from '../slices/authSlice';
import baseQueryWithRetry from './baseQueryWithRetry';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
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
    refresh: builder.mutation<TokenResponse, void>({
      query: () => {
        return {
          url: '/auth/refresh',
          method: 'POST',
          body: {
            grantType: 'refresh_token',
          },
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
    sendEmailVerification: builder.mutation<
      {
        success: boolean;
      },
      { username: string; captcha: string }
    >({
      query: (data) => {
        return {
          url: '/members/send-email-verification',
          method: 'POST',
          body: data,
        };
      },
    }),
    sendEmailCode: builder.mutation<
      {
        success: boolean;
      },
      { username: string; code: string; captcha: string }
    >({
      query: (data) => {
        return {
          url: '/members/send-email-code',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useRefreshMutation,
  useSendEmailVerificationMutation,
  useSendEmailCodeMutation,
} = authApi;

export { authApi };
