// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const boxApi = createApi({
  reducerPath: 'boxApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sweetincmgmtapi.azurewebsites.net/api/',
  }),
  endpoints: (builder) => ({
    getAllBox: builder.query({
      query: () => `Boxes/GetAll`,
      providesTags: ['Box'],
    }),
    deleteBox: builder.mutation({
      query: ({ id }) => ({
        url: `Boxes/Delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Box'],
    }),
    editBox: builder.mutation({
      query: ({ data }) => ({
        url: `Boxes/Update/${data.id}`,
        method: 'PUT',
        body: {
          id: data.id,
          quantity: data.quantity,
          lowerAge: data.lowerAge,
          upperAge: data.upperAge,
          status: data.status,
          boxPatternId: data.boxPatternId,
        },
      }),
      invalidatesTags: ['Box'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllBoxQuery, useDeleteBoxMutation, useEditBoxMutation } =
  boxApi;
