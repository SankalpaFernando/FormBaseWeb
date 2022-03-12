import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type FormProps = {
  _id: string;
  name: string;
  description: string;
}


type GetFormByIDProps = {
  docs: FormProps[];
  totalPages: number;
};








export const formAPI = createApi({
  reducerPath: 'formAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getFormsByProjectID: builder.query<
      GetFormByIDProps,
      { projectID: string; page: number }
    >({
      query: ({ projectID, page }) => `/form/${projectID}?page=${page}`,
    }),
    addForm: builder.mutation({
      query: (body) => ({
        url: '/form',
        method: 'POST',
        body,
      }),
    }),
  }),
});


export const { useGetFormsByProjectIDQuery, useAddFormMutation } = formAPI;
export default formAPI.reducer;