import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authenticate = createAsyncThunk<
  any,
  {
    email: string;
    password: string;
  }
>(
  'auth/authenticate',
  async ({ email, password }) => {
    console.log(email);
    console.log(password);

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

    console.log(response.data);

    return response.data;
  },
  {}
);

export { authenticate };
