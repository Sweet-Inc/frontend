import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import { boxApi } from '../services/box';
import { brandApi } from '../services/brand';
import { categoryApi } from '../services/category';
import { boxPatternApi } from '../services/boxPattern';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [boxApi.reducerPath]: boxApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [boxPatternApi.reducerPath]: boxPatternApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boxApi.middleware)
      .concat(brandApi.middleware)
      .concat(boxPatternApi.middleware)
      .concat(categoryApi.middleware),
});
