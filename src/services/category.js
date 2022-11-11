// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sweetincmgmtapi.azurewebsites.net/api/',
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => `Catagories/GetAll`,
      providesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `Catagories/Delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
    editCategory: builder.mutation({
      query: ({ data }) => ({
        url: `Catagories/Update/${data.id}`,
        method: 'PUT',
        body: {
          id: data.id,
          name: data.name,
        },
      }),
      invalidatesTags: ['Category'],
    }),
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: `Catagories/Add`,
        method: 'POST',
        body: {
          name: data.name,
        },
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useCreateCategoryMutation,
} = categoryApi;
