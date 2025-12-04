// // Admin Flow ---> Users List

// export interface User {
//     _id: string;
//     username: string;
//     email: string;
//     role: "user" | "admin";
//     createdAt: string;
//     updatedAt: string;
//   }
  
//   export interface GetUsersResponse {
//     message: string;
//     totalUsers: number;
//     users: User[];
//   }

// // Admin Flow ---> Tasks List
//   export interface Task {
//     _id: string;
//     title: string;
//     description: string;
//     status: "pending" | "completed";
//     userId: string;
//     createdAt: string;
//     updatedAt: string;
//   }
  
//   export interface GetUserTasksResponse {
//     message: string;
//     totalTasks: number;
//     tasks: Task[];
//   }