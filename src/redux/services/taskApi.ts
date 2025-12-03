import { api } from "./api";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any[], void>({
      query: () => "/user/task",
      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation<any, any>({
      query: (body) => ({
        url: "/user/task",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<any, any>({
      query: ({ id, ...body }) => ({
        url: `/user/task/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const { useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation } =
  taskApi;
