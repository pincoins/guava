import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithRetry from './baseQueryWithRetry';
import { Product } from '../../types';

const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], string>({
      query: (slug: string) => {
        return {
          url: '/products',
          method: 'GET',
          params: {
            categorySlug: slug,
          },
        };
      },
    }),
    fetchCartItems: builder.query<Product[], number[]>({
      query: (products: number[]) => {
        return {
          url: '/products',
          method: 'GET',
          params: {
            products: products.toString(),
          },
        };
      },
    }),
  }),
});

export const { useFetchProductsQuery, useFetchCartItemsQuery } = productApi;

export { productApi };
