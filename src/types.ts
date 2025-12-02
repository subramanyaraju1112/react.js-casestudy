// User ---> Add Task ---> Modal

type TaskStatus = "pending" | "completed";
interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdOn: string;
}

export type { Task };


// Admin ---> Users
interface User {
  id: number;
  name: string;
  email: string;
}

export type { User };
