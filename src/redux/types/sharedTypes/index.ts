// SHARED / UI ONLY (NOT BACKEND)

export type TaskStatus = "pending" | "completed";

/* USED FOR MOCK DATA / UI */
export interface UITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdOn: string;
}

/* USED IN STATIC USER LIST UI */
export interface UIUser {
  id: number;
  name: string;
  email: string;
}
