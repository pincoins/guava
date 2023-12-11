import { createSlice } from '@reduxjs/toolkit';
import { parseJwt } from '../../utils/parseJwt';
import { loadState } from '../storages';

type LoginState = 'AUTHENTICATED' | 'EXPIRED' | 'UNAUTHENTICATED';

interface AuthState {
  rememberMe: boolean | null; // persisted
  validUntil: string | null; // persisted
  accessToken: string | null;
  expiresIn: number | null;
  sub: number | null;
  role: string | null;
  username: string | null;
  loginState: LoginState;
}

const persistedState = loadState();

const initialState: AuthState = {
  // 새로고침 시 액세스 토큰 만료 & 쿠키 만료 이전 상태인지 확인
  rememberMe: persistedState?.auth?.rememberMe || false,
  validUntil: persistedState?.auth?.validUntil || null,
  accessToken: null,
  expiresIn: null,
  sub: null,
  role: null,
  username: null,
  loginState:
    persistedState?.auth?.rememberMe &&
    persistedState?.auth?.validUntil &&
    new Date() < new Date(persistedState.auth.validUntil)
      ? 'EXPIRED'
      : 'UNAUTHENTICATED',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    // not async action
    setCredentials: (state, action) => {
      state.rememberMe = true;
      state.validUntil = new Date(
        new Date().getTime() +
          parseInt(`${process.env.REFRESH_TOKEN_EXPIRES_IN}`) * 1000
      ).toISOString(); // Date 객체 직접 저장하려면 serializableCheck: false

      state.accessToken = action.payload.accessToken;
      state.expiresIn = action.payload.expiresIn;

      const jwt = parseJwt(action.payload.accessToken);

      state.sub = jwt.sub;
      state.role = jwt.role;
      state.username = jwt.username;

      state.loginState = 'AUTHENTICATED';
    },
    signOut: (state) => {
      state.rememberMe = false;
      state.validUntil = null;

      state.accessToken = null;
      state.expiresIn = null;
      state.sub = null;
      state.role = null;
      state.username = null;

      state.loginState = 'UNAUTHENTICATED';
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;

export default authSlice.reducer;
