import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const templateAPI = createApi({
  reducerPath: 'templateAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/template',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addTemplate: builder.mutation({ query: (body) => ({ url: "/", method: "Post", body }) }),
    getTemplate: builder.query({
      query: ({type,page}) => {
        if (type === "User") {
          return `?page=${page}`;
        } else {
          return `/default?page=${page}`;
        }
      }
    }),
    getAllTemplate: builder.query({ query: () => `/all` }),
    updateTemplate: builder.mutation({ query: ({ templateID, body }) => ({ url: `/${templateID}`, method: "Put", body }) }),
    deleteTemplate: builder.mutation({ query: (templateID) => ({ url: `/${templateID}`, method: "Delete" }) })
  })
});

export const {
  useAddTemplateMutation,
  useGetTemplateQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  useGetAllTemplateQuery
} = templateAPI;
