import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { env } from "./env";
import { logger } from "./middlewares/logger";
import { api } from "./api";

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(logger({ includeTimestamp: true }))
  .get("/", () => {
    return "Server is running!";
  })
  .use(api)
  .listen(env.serverPort);

export type App = typeof app;
