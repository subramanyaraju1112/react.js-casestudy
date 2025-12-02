// User ---> Task List
import type { Task } from "./types";

const tasks: Task[] = [
  {
    id: 1,
    title: "Design Review",
    description:
      "Conduct a thorough review of the design elements to ensure alignment with project goals and user needs.",
    status: "pending",
    createdOn: "21 Jun, 2025",
  },
  {
    id: 2,
    title: "System Planning",
    description: "Prepare architecture flow and component structure.",
    status: "completed",
    createdOn: "18 Jun, 2025",
  },
  {
    id: 3,
    title: "API Integration",
    description: "Integrate backend authentication APIs.",
    status: "completed",
    createdOn: "15 Jun, 2025",
  },
  {
    id: 4,
    title: "Testing",
    description: "Write and execute test cases across modules.",
    status: "pending",
    createdOn: "12 Jun, 2025",
  },
  {
    id: 5,
    title: "Bug Fixing",
    description: "Fix critical issues reported during QA cycle.",
    status: "pending",
    createdOn: "10 Jun, 2025",
  },
  {
    id: 6,
    title: "Deployment",
    description: "Prepare production build and release.",
    status: "completed",
    createdOn: "08 Jun, 2025",
  },
  {
    id: 7,
    title: "Documentation",
    description: "Document API contracts and flows.",
    status: "completed",
    createdOn: "06 Jun, 2025",
  },
];

export { tasks };

// Admin ---> Users List
import type { User } from "./types";

const users: User[] = [
  {
    id: 1,
    name: "Ab De Villiers",
    email: "abd@test.com",
  },
  {
    id: 2,
    name: "Virat Kohli",
    email: "virat@test.com",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    email: "rohit@test.com",
  },
  {
    id: 4,
    name: "MS Dhoni",
    email: "dhoni@test.com",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    email: "sachin@test.com",
  },
  {
    id: 6,
    name: "Chris Gayle",
    email: "gayle@test.com",
  },
  {
    id: 7,
    name: "David Warner",
    email: "warner@test.com",
  },
  {
    id: 8,
    name: "Steve Smith",
    email: "smith@test.com",
  },
  {
    id: 9,
    name: "Kane Williamson",
    email: "kane@test.com",
  },
  {
    id: 10,
    name: "Joe Root",
    email: "root@test.com",
  },
  {
    id: 11,
    name: "Babar Azam",
    email: "babar@test.com",
  },
  {
    id: 12,
    name: "Ben Stokes",
    email: "stokes@test.com",
  },
  {
    id: 13,
    name: "Shikhar Dhawan",
    email: "dhawan@test.com",
  },
  {
    id: 14,
    name: "KL Rahul",
    email: "rahul@test.com",
  },
  {
    id: 15,
    name: "Hardik Pandya",
    email: "hardik@test.com",
  },
  {
    id: 16,
    name: "Jasprit Bumrah",
    email: "bumrah@test.com",
  },
  {
    id: 17,
    name: "Ravindra Jadeja",
    email: "jadeja@test.com",
  },
  {
    id: 18,
    name: "Suryakumar Yadav",
    email: "surya@test.com",
  },
  {
    id: 19,
    name: "Rishabh Pant",
    email: "pant@test.com",
  },
  {
    id: 20,
    name: "Faf du Plessis",
    email: "faf@test.com",
  },
  {
    id: 21,
    name: "Glenn Maxwell",
    email: "maxwell@test.com",
  },
  {
    id: 22,
    name: "Andre Russell",
    email: "russell@test.com",
  },
  {
    id: 23,
    name: "Quinton de Kock",
    email: "qdk@test.com",
  },
];

export { users };
