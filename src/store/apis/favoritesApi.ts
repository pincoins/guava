import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithRetry from './baseQueryWithRetry';
import { Favorites } from '../../types';

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
    saveFavorites: builder.mutation<
      Favorites,
      { sub: number; favorites: Favorites }
    >({
      query: ({ sub, favorites }) => {
        return {
          url: `/members/${sub}/favorites`,
          method: 'POST',
          body: favorites,
        };
      },
    }),
  }),
});

export const { useFetchFavoritesQuery, useSaveFavoritesMutation } =
  favoritesApi;

export { favoritesApi };
