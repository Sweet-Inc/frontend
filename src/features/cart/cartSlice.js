import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      let index = state.data.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        let newDataState = [...state.data];
        newDataState[index] = {
          ...state.data[index],
          quantity: state.data[index].quantity + 1,
        };
        state.data = newDataState;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action) => {
      let index = state.data.findIndex((item) => item.id === action.payload.id);

      let newDataState = [...state.data];
      if (newDataState[index].quantity === 1) {
        state.data = state.data.filter((item) => item.id !== action.payload.id);
        return;
      }
      newDataState[index] = {
        ...state.data[index],
        quantity: state.data[index].quantity - 1,
      };
      state.data = newDataState;
    },
    removeItem: (state, action) => {
      console.log(action.payload.id);
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
