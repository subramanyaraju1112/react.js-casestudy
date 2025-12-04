// ADMIN FLOW TYPES ONLY

export type AdminRole = "user" | "admin";
export type TaskStatus = "pending" | "completed";

/* USERS */
export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  message: string;
  totalUsers: number;
  users: AdminUser[];
}

/* TASKS */
export interface AdminTask {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserTasksResponse {
  message: string;
  totalTasks: number;
  user: {
    _id: string;
    username: string;
    email: string;
  };

  tasks: AdminTask[];
}
