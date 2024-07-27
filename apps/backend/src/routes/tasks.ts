import Elysia from "elysia";

const tasksData = [
  {
    id: 1,
    title: "Write Unit Tests",
    description: "Write unit tests for the user authentication module.",
    completed: false,
  },
  {
    id: 2,
    title: "Update Documentation",
    description: "Update the API documentation to include the new endpoints.",
    completed: true,
  },
  {
    id: 3,
    title: "Fix Bug #234",
    description:
      "Investigate and fix the reported issue in the payment processing module.",
    completed: false,
  },
  {
    id: 4,
    title: "Deploy to Staging",
    description:
      "Deploy the latest build to the staging environment for QA testing.",
    completed: true,
  },
  {
    id: 5,
    title: "Code Review",
    description: "Review the code changes submitted by team members.",
    completed: false,
  },
];

export const tasksRoutes = new Elysia({ prefix: "/tasks" }).get(
  "/",
  () => tasksData,
);
