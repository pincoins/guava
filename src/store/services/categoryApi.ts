import { createApi } from '@reduxjs/toolkit/query/react';
import { Category } from '../models/interfaces';
import customBaseQuery from './customBaseQuery';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customBaseQuery,
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
