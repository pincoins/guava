import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TokenResponse } from '../models/interfaces';
import { setCredentials } from '../slices/authSlice';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      any,
      { username: string; fullName: string; email: string; password: string }
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
        email: string;
        password: string;
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
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;

export { authApi };
