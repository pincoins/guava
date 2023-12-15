import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../storages';

interface CartItem {
  categoryId: number;
  productId: number;
  slug: string;
  name: string;
  subtitle: string;
  listPrice: number;
  sellingPrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const persistedState = loadState();

const initialState: CartState = {
  items: persistedState?.cart.items || [],
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
          ...newItem,
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
    deleteItem: (state, action) => {
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
    setItem: (state, action) => {
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

export const { addToCart, removeFromCart, deleteItem, clearCart, setItem } =
  cartSlice.actions;

export default cartSlice.reducer;
