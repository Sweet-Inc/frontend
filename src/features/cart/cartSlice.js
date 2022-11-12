import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data.push(1);
    },
    removeItem: (state) => {
      state.data.pop();
    },
    clearCart: (state, action) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
