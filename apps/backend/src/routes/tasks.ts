import Elysia from "elysia";

const tasksData = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    completed: true,
  },
];

export const tasksRoutes = new Elysia({ prefix: "/tasks" }).get(
  "/",
  () => tasksData,
);
