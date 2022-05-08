//  //@ts-nocheck

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/user/${body.userID}`,
        method: 'PUT',
        body: body.data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (body) => ({
        url: `/user/${body.userID}`,
        method:"DELETE"
      })
    })
  }),
});

export const {
  useUpdateUserMutation,
  useDeleteUserMutation
} = userAPI;
