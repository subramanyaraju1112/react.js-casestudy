import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => "/admin/all-users",
      providesTags: ["Users"],
    }),
    getUserTasks: builder.query<any[], string>({
      query: (userId) => `/admin/all-users/${userId}/tasks`,
      providesTags: ["Tasks"],
    }),
    addUserTask: builder.mutation<any, { userId: string; title: string; description: string; status?: string }>({
      query: ({ userId, ...body }) => ({
        url: `/all-users/${userId}/tasks`,
        method: "POST",
        body,
      }),
    }),
    updateUserTask: builder.mutation<any, { userId: string; taskId: string; title?: string; description?: string; status?: string }>({
      query: ({ userId, taskId, ...body }) => ({
        url: `/admin/all-users/${userId}/tasks/${taskId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteUserTask: builder.mutation<void, { userId: string; taskId: string }>({
      query: ({ userId, taskId }) => ({
        url: `/admin/all-users/${userId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserTasksQuery,
  useAddUserTaskMutation,
  useUpdateUserTaskMutation,
} = adminApi;
