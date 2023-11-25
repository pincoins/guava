import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from './services/categoryApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './slices/authSlice';
import { authApi } from './services/authApi';
import { viewportSlice } from './slices/viewportSlice';
import { saveState } from './storages';

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

store.subscribe(() => {
  console.log(store.getState());

  // 스토어 상태 변경 될 때마다 스토어 저장
  saveState({
    auth: {
      isAuthenticated: store.getState().auth.isAuthenticated,
      validUntil: store.getState().auth.validUntil,
    },
  });

  // deleteState();
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
