import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../models/interfaces';

const categoryApi = createApi({
  reducerPath: 'categories',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
  endpoints: (builder) => ({
    fetchCategories: builder.query<Category[], void>({
      query: () => {
        return {
          url: '/categories',
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchCategoriesQuery } = categoryApi;

export { categoryApi };
