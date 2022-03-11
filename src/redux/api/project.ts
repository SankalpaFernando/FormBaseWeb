import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectAPI = createApi({
  reducerPath: 'infoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/project',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProjects: builder.query({ query: () => '/' }),
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
  useAddPostMutation
} = projectAPI;
