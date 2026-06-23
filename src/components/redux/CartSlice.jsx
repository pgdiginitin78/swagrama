import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      const qtyToAdd = action.payload.quantity || 1;

      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        state.items.push({
          ...action.payload,
          quantity: qtyToAdd,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity = quantity;
      }

      state.items = state.items.filter((i) => i.quantity > 0);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
