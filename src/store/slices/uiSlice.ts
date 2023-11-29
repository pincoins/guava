import { createSlice } from '@reduxjs/toolkit';

interface UiSlice {
  width?: number;
  height?: number;
  isMobile?: boolean;
}

const initialState: UiSlice = {};

const breakpoint = 640;

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    setViewportSize: (state, action) => {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        isMobile: action.payload.width < breakpoint,
      };
    },
  },
});

export const { setViewportSize } = uiSlice.actions;

export default uiSlice.reducer;
