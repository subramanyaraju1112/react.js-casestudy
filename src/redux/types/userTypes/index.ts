// USER FLOW TYPES ONLY

export type TaskStatus = "pending" | "completed";

export interface UserTask {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetTasksResponse {
  message: string;
  tasks: UserTask[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface CreateTaskResponse {
  message: string;
  task: UserTask;
}
