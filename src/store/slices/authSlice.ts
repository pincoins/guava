import { createSlice } from '@reduxjs/toolkit';
import { parseJwt } from '../../utils/parseJwt';
import { loadState } from '../storages';

interface AuthState {
  rememberMe: boolean | null; // persisted
  validUntil: string | null; // persisted
  accessToken: string | null;
  expiresIn: number | null;
  role: string | null;
  username: string | null;
}

const persistedState = loadState();

const initialState: AuthState = {
  rememberMe: persistedState?.auth?.rememberMe || false,
  validUntil: persistedState?.auth?.validUntil || null,
  accessToken: null,
  expiresIn: null,
  role: null,
  username: null,
};

export const authSlice = createSlice({
  name: 'authState',
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

      state.role = jwt.role;
      state.username = jwt.username;
    },
    signOut: (state) => {
      state.rememberMe = false;
      state.validUntil = null;

      state.accessToken = null;
      state.expiresIn = null;
      state.role = null;
      state.username = null;
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;

export default authSlice.reducer;
