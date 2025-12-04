import type {
  CreateTaskRequest,
  CreateTaskResponse,
  GetTasksResponse,
} from "../types/userTypes";
import { api } from "./api";

export const taskApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, void>({
      query: () => "/user/task",
      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
      query: (body) => ({
        url: "/user/task",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<
      { message: string; task: any },
      {
        id: string;
        title?: string;
        description?: string;
        status?: "pending" | "completed";
      }
    >({
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
