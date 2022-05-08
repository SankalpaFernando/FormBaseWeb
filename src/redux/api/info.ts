// @ts-nocheck

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const infoAPI = createApi({
  reducerPath: 'infoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getDataSetInfo: builder.query({ query: () => '/info/count/dataset' }),
    getFormInfo: builder.query({ query: () => '/info/count/form' }),
    getProjectInfo: builder.query({ query: () => '/info/count/project' }),
    getTemplateInfo: builder.query({ query: () => `/info/count/template` }),
    getLatestLog: builder.query({ query: () => `/logs/latest` }),
    getTotalSubmits: builder.query({ query: () => `/logs/charts` }),
    getCurrentUser: builder.query({ query: () => `/auth/user` }),
    getStatsByUser: builder.query({query:()=>`/logs/stats/user`})
  }),
});

export const {
  useGetProjectInfoQuery,
  useGetDataSetInfoQuery,
  useGetFormInfoQuery,
  useGetTemplateInfoQuery,
  useGetLatestLogQuery,
  useGetTotalSubmitsQuery,
  useGetCurrentUserQuery,
  useGetStatsByUserQuery
} = infoAPI;
