import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from './services/categoryApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './slices/authSlice';
import { authApi } from './services/authApi';
import { viewportSlice } from './slices/viewportSlice';

export const store = configureStore({
  reducer: {
    viewport: viewportSlice.reducer,
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryApi.middleware);
  },
});

setupListeners(store.dispatch); // optional, but for refetch behaviors

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
