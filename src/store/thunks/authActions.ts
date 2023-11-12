import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AccessTokenResponse, ErrorResponse } from '../models/interfaces';

const authenticate = createAsyncThunk<
  AccessTokenResponse,
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
});

export { authenticate };
