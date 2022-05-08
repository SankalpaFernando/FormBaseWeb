//  //@ts-nocheck

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentAPI = createApi({
  reducerPath: 'paymentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createFreeSubscription: builder.mutation({
      query: (body) => ({
        url: `user/subscription/free/${body.userID}`,
        method:"POST"
        
      })
    })
  }),
});

export const { useCreateFreeSubscriptionMutation } = paymentAPI;
