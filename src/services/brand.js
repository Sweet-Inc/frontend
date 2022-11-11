// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sweetincmgmtapi.azurewebsites.net/api/',
  }),
  tagTypes: ['Brand'],
  endpoints: (builder) => ({
    getAllBrand: builder.query({
      query: () => `Brands/GetAll`,
      providesTags: ['Brand'],
    }),
    deleteBrand: builder.mutation({
      query: ({ id }) => ({
        url: `Brands/Delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brand'],
    }),
    editBrand: builder.mutation({
      query: ({ data }) => ({
        url: `Brands/Update/${data.id}`,
        method: 'PUT',
        body: {
          id: data.id,
          name: data.name,
          originid: data.originid,
        },
      }),
      invalidatesTags: ['Brand'],
    }),
    createBrand: builder.mutation({
      query: ({ data }) => ({
        url: `Brands/Add`,
        method: 'POST',
        body: {
          name: data.name,
          originid: data.originid,
        },
      }),
      invalidatesTags: ['Brand'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllBrandQuery,
  useEditBrandMutation,
  useDeleteBrandMutation,
  useCreateBrandMutation,
} = brandApi;
