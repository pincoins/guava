import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../storages';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
}

const persistedState = loadState();

const initialState: CartState = {
  items: persistedState?.cart?.items || [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );

      if (!existingItem) {
        state.items.push({
          productId: newItem.productId,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        } else {
          existingItem.quantity--;
        }
      }
    },
    deleteCartItem: (state, action) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((i) => i.productId === productId);

      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.productId !== productId
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteCartItem,
  clearCart,
  setCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
