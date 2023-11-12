import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category, ResponseDataType } from '../models/interfaces';
import axios from 'axios';

const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/categories', {
        baseURL: process.env.API_URL,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ResponseDataType, any>(error)) {
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

export { fetchCategories };
