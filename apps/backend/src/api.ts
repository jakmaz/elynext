import Elysia from "elysia";
import { authRoutes } from "./routes/auth";

export const api = new Elysia({
  prefix: "/api",
}).use(authRoutes);
