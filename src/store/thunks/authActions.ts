import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ErrorResponse, TokenResponse } from '../models/interfaces';

const signIn = createAsyncThunk<
  TokenResponse,
  {
    email: string;
    password: string;
  }
>('auth/authenticate', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      '/auth/authenticate',
      {
        email,
        password,
        grantType: 'password',
      },
      {
        baseURL: process.env.API_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // save refreshToken in local storage, but accessToken in memory (XSS)
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse, any>(error)) {
      if (error?.response?.data) {
        if (error.response.data.errors.length > 0) {
          return rejectWithValue(error.response.data.errors);
        } else {
          return rejectWithValue(error.response?.data.message);
        }
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
});

const signUp = createAsyncThunk<
  any,
  { username: string; fullName: string; email: string; password: string }
>(
  'auth/signUp',
  async ({ username, fullName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/members',
        {
          username,
          fullName,
          email,
          password,
        },
        {
          baseURL: process.env.API_URL,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse, any>(error)) {
        if (error?.response?.data) {
          if (error.response.data.errors.length > 0) {
            return rejectWithValue(error.response.data.errors);
          } else {
            return rejectWithValue(error.response?.data.message);
          }
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export { signIn, signUp };
