import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
console.log("🚀 ~ file: template.ts ~ line 7 ~ import.meta.env.VITE_API", import.meta.env.VITE_API)

export const templateAPI = createApi({
  reducerPath: 'templateAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/template`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addTemplate: builder.mutation({
      query: (body) => ({ url: '/', method: 'Post', body }),
    }),
    getTemplate: builder.query({
      query: ({ type, page }) => {
        if (type === 'User') {
          return `?page=${page}`;
        } else {
          return `/default?page=${page}`;
        }
      },
    }),
    getAllTemplate: builder.query({ query: () => `/all` }),
    updateTemplate: builder.mutation({
      query: ({ templateID, body }) => ({
        url: `/${templateID}`,
        method: 'Put',
        body,
      }),
    }),
    deleteTemplate: builder.mutation({
      query: (templateID) => ({ url: `/${templateID}`, method: 'Delete' }),
    }),
  }),
});

export const {
  useAddTemplateMutation,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  useGetAllTemplateQuery
} = templateAPI;
