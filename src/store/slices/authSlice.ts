import { createSlice } from '@reduxjs/toolkit';
import { authenticate } from '../thunks/authActions';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'something wrong';
      });
  },
});

export default authSlice.reducer;
