import type {
  AdminTask,
  GetUsersResponse,
  GetUserTasksResponse,
} from "../types/adminTypes";
import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => "/admin/all-users",
      providesTags: ["Users"],
    }),
    getUserTasks: builder.query<GetUserTasksResponse, string>({
      query: (userId) => `/admin/all-users/${userId}/tasks`,
      providesTags: ["Tasks"],
    }),
    addUserTask: builder.mutation<
      { message: string; task: AdminTask },
      { userId: string; title: string; description: string; status?: string }
    >({
      query: ({ userId, ...body }) => ({
        url: `/admin/all-users/${userId}/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateUserTask: builder.mutation<
      { message: string; task: AdminTask },
      {
        userId: string;
        taskId: string;
        title?: string;
        description?: string;
        status?: "pending" | "completed";
      }
    >({
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
  useDeleteUserTaskMutation
} = adminApi;
