import Elysia from "elysia";
import { authRoutes } from "./routes/auth";
import { tasksRoutes } from "./routes/tasks";

export const api = new Elysia({
  prefix: "/api",
})
  .use(authRoutes)
  .use(tasksRoutes);
