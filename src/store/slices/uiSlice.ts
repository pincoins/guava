import { createSlice } from '@reduxjs/toolkit';

interface UiSlice {
  width?: number;
  height?: number;
  isMobile?: boolean;
  isModalOpen: boolean;
}

const initialState: UiSlice = {
  isModalOpen: false,
};

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
    openModal: (state) => {
      return {
        ...state,
        isModalOpen: true,
      };
    },
    closeModal: (state) => {
      return {
        ...state,
        isModalOpen: false,
      };
    },
  },
});

export const { setViewportSize, openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
