// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const boxPatternApi = createApi({
  reducerPath: 'boxPatternApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sweetincmgmtapi.azurewebsites.net/api/',
  }),
  tagTypes: ['BoxPattern'],
  endpoints: (builder) => ({
    getAllBoxPattern: builder.query({
      query: () => `BoxPatterns/GetAll`,
      providesTags: ['BoxPattern'],
    }),
    deleteBoxPattern: builder.mutation({
      query: ({ id }) => ({
        url: `BoxPatterns/Delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BoxPattern'],
    }),
    editBoxPattern: builder.mutation({
      query: ({ data }) => ({
        url: `BoxPatterns/Update/${data.id}`,
        method: 'PUT',
        body: {
          id: data.id,
          name: data.name,
          image: data.image,
          status: data.status,
          price: data.price,
        },
      }),
      invalidatesTags: ['BoxPattern'],
    }),
    createBoxPattern: builder.mutation({
      query: ({ data }) => ({
        url: `BoxPatterns/Add`,
        method: 'POST',
        body: {
          name: data.name,
          image: data.image,
          status: true,
          price: data.price,
        },
      }),
      invalidatesTags: ['BoxPattern'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateBoxPatternMutation,
  useDeleteBoxPatternMutation,
  useEditBoxPatternMutation,
  useGetAllBoxPatternQuery,
} = boxPatternApi;
