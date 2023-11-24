import { createSlice } from '@reduxjs/toolkit';

interface ViewportState {
  width?: number;
  height?: number;
  isMobile?: boolean;
}

const initialState: ViewportState = {};

const breakpoint = 640;

export const viewportSlice = createSlice({
  name: 'viewportState',
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

export const { setViewportSize } = viewportSlice.actions;

export default viewportSlice.reducer;
