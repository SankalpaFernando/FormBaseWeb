import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectAPI = createApi({
  reducerPath: 'projectAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({ query: (page) => `/project?page=${page}` }),
    getProjectByID: builder.query({
      query: (projectID) => `/project/${projectID}`,
    }),
    updateProject: builder.mutation({
      query: (body) => ({
        url: `/project/${body.projectID}`,
        method: 'PUT',
        body: body.data,
      }),
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
    deleteAllForms: builder.mutation({
      query: ({ projectID }) => ({
        url: `/project/all/${projectID}`,
        method: 'Delete',
      }),
    }),
    deleteProject: builder.mutation({
      query: ({ projectID }) => ({
        url: `/project/${projectID}`,
        method: 'Delete',
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIDQuery,
  useAddPostMutation,
  useUpdateProjectMutation,
  useDeleteAllFormsMutation,
  useDeleteProjectMutation
} = projectAPI;
