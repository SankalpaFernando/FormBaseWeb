import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectAPI = createApi({
  reducerPath: 'infoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({ query: () => '/project' }),
    getProjectByID: builder.query({query:(projectID)=>`/project/${projectID}`}),
    updateProject: builder.mutation({
      query: (body) => ({
        url: `/project/${body.projectID}`,
        method: "PUT",
        body:body.data
      })
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body
      })
    })
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIDQuery,
  useAddPostMutation,
  useUpdateProjectMutation,
} = projectAPI;
