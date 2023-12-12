import { createApi } from '@reduxjs/toolkit/query/react';
import { Product } from '../interfaces/interfaces';
import baseQueryWithRetry from './baseQueryWithRetry';

const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], { slug: string }>({
      query: (category: { slug: string }) => {
        return {
          url: '/products',
          method: 'GET',
          params: {
            categorySlug: category.slug,
          },
        };
      },
    }),
  }),
});

export const { useFetchProductsQuery } = productApi;

export { productApi };
