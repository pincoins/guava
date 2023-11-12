import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice';
import { categoryApi } from './apis/categoryApi';
import { categorySlice } from './slices/categorySlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    categoriesSlice: categorySlice.reducer,
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
