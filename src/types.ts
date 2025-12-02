type TaskStatus = "pending" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdOn: string;
}

export type { Task };
