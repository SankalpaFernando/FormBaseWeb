import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const infoAPI = createApi({
  reducerPath: 'infoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/info',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getDataSetInfo: builder.query({ query: () => '/count/dataset' }),
    getFormInfo: builder.query({ query: () => '/count/form' }),
    getProjectInfo: builder.query({ query: () => '/count/project' }),
    getTemplateInfo: builder.query({query:()=> `/count/template`})
  }),
});

export const { useGetProjectInfoQuery,useGetDataSetInfoQuery,useGetFormInfoQuery,useGetTemplateInfoQuery } = infoAPI;