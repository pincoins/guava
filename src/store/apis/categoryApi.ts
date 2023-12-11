import { createApi } from '@reduxjs/toolkit/query/react';
import { Category } from '../models/interfaces';
import baseQueryWithRetry from './baseQueryWithRetry';

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    fetchCategories: builder.query<Category[], void>({
      query: () => {
        return {
          url: '/categories',
          method: 'GET',
        };
      },
    }),
    fetchCategory: builder.query<Category, string>({
      query: (slug: string) => {
        return {
          url: `/categories/${slug}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchCategoryQuery } = categoryApi;

export { categoryApi };
