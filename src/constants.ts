// User Task
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
