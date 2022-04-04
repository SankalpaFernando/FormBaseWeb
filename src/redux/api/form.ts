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
      query: ({ projectID, page }) => `/form/project/${projectID}?page=${page}`,
    }),
    addForm: builder.mutation({
      query: (body) => ({
        url: '/form',
        method: 'POST',
        body,
      }),
    }),
    addWebhook: builder.mutation({
      query: ({ formID, body }) => ({
        url: `/webhook/${formID}`,
        method: 'POST',
        body,
      }),
    }),
    deleteWebhook: builder.mutation({
      query: ({ formID, webhookID }) => ({
        url: `/webhook/${formID}/${webhookID}`,
        method: 'DELETE',
      }),
    }),
    updateWebhook: builder.mutation({
      query: ({ formID, webhookID,body }) => ({
        url: `/webhook/${formID}/${webhookID}`,
        method: 'PUT',
        body
      }),
    }),
    getFormLogs: builder.query({ query: (formID) => `/logs/latest/${formID}` }),
    getFormStats: builder.query({ query: (formID) => `/logs/stats/${formID}` }),
    getFormCharts: builder.query({
      query: (formID) => `/logs/charts/${formID}`,
    }),
    getEntries: builder.query({
      query: ({ formID, page }) => `/entry/${formID}?page=${page}`,
    }),
    getFormByID: builder.query({ query: (formID) => `/form/${formID}` }),
    updateForm: builder.mutation({
      query: ({ formID, body }) => ({
        url: `/form/${formID}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteEntryBulk: builder.mutation({
      query: (body) => ({
        url: `/entry`,
        method: "Delete",
        body
      })
    }),
    deleteAll: builder.mutation({
      query: ({formID}) => ({
        url:`/entry/all/${formID}`,
        method:"Delete"
      })
    }),
    deleteForm: builder.mutation({
      query: ({ formID }) => ({
        url: `/form/${formID}`,
        method:"Delete"
      })
    }),
    getAllForms: builder.query({query:()=>`/form/all`})
  }),
});


export const {
  useGetFormsByProjectIDQuery,
  useAddFormMutation,
  useGetFormLogsQuery,
  useGetFormStatsQuery,
  useGetFormChartsQuery,
  useGetEntriesQuery,
  useGetFormByIDQuery,
  useUpdateFormMutation,
  useAddWebhookMutation,
  useDeleteWebhookMutation,
  useUpdateWebhookMutation,
  useDeleteEntryBulkMutation,
  useDeleteAllMutation,
  useDeleteFormMutation,
  useGetAllFormsQuery
} = formAPI;
export default formAPI.reducer;