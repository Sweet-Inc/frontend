import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { boxApi } from '../services/box';
import { brandApi } from '../services/brand';
import { categoryApi } from '../services/category';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [boxApi.reducerPath]: boxApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boxApi.middleware)
      .concat(brandApi.middleware)
      .concat(categoryApi.middleware),
});
