import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../thunks/categoryActions';
import { Category } from '../models/interfaces';

interface CategoryState {
  data: Category[];
  loading: boolean;
  error: any;
}

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
