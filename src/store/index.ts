import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from './apis/categoryApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(categoryApi.middleware);
  },
});

setupListeners(store.dispatch); // optional, but for refetch behaviors

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
