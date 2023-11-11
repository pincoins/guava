import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// `store`에서 루트 리듀서의 반환값을 추론
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용하므로 내보낸다.
export type RootState = ReturnType<typeof store.getState>;

// store.reducer 타입 추론
export type AppDispatch = typeof store.dispatch;

export default store;
