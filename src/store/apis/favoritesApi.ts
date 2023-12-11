import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithRetry from './baseQueryWithRetry';
import { Favorites } from '../models/interfaces';

const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    fetchFavorites: builder.query<Favorites, number>({
      query: (sub) => {
        return {
          url: `/members/${sub}/favorites`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchFavoritesQuery } = favoritesApi;

export { favoritesApi };
