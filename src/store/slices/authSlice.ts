import { createSlice } from '@reduxjs/toolkit';
import { parseJwt } from '../../utils/parseJwt';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  role: string | null;
  username: string | null;
}

const initialState: AuthState = {
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
      // localStorage.setItem('refreshToken', action.payload.refreshToken);

      state.accessToken = action.payload.accessToken;
      state.expiresIn = action.payload.expiresIn;

      const jwt = parseJwt(action.payload.accessToken);

      state.role = jwt.role;
      state.username = jwt.username;
    },
    signOut: (state) => {
      // localStorage.removeItem('refreshToken');

      state.accessToken = null;
      state.expiresIn = null;
    },
  },
});

export const { setCredentials, signOut } = authSlice.actions;

export default authSlice.reducer;
