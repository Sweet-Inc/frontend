// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sweetincmgmtapi.azurewebsites.net/api/',
  }),
  endpoints: (builder) => ({
    getAllBrand: builder.query({
      query: () => `Brands/GetAll`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllBrandQuery } = brandApi;
