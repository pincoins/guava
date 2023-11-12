import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../models/interfaces';
import axios from 'axios';

const fetchCategories = createAsyncThunk<Category[], void, any>(
  'categories/fetch',
  async () => {
    const response = await axios.get('/categories', {
      baseURL: process.env.API_URL,
    });

    return response.data;
  },
  {}
);

export { fetchCategories };
