import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../thunks/authActions';

interface AuthState {
  accessToken: string | null;
  expiresIn: number | null;
  registered: boolean;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  accessToken: null,
  expiresIn: null,
  registered: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      // not async action
      localStorage.removeItem('refreshToken');

      state.accessToken = null;
      state.expiresIn = null;
      state.registered = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.expiresIn = action.payload.expiresIn;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
