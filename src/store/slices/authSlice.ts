import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
}

const initialState: AuthState = {
  accessToken: null,
  expiresIn: null,
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
