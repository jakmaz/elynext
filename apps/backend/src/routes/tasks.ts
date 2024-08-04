import Elysia, { t } from "elysia";
import db from "../db/db";
import { tasks } from "../db/schema";
import { jwtValidation } from "../middlewares/auth";
import { eq } from "drizzle-orm";

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .use(jwtValidation)
  .get(
    "/",
    async ({ user }) => {
      const todos = await db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, user.id));
      return { message: "Todos found", body: todos };
    },
    { requireAuth: true },
  )
  .post(
    "/",
    async ({ user, body }) => {
      const { title, description } = body;

      const [task] = await db
        .insert(tasks)
        .values({
          title,
          description,
          userId: user.id,
        })
        .returning();
      return { message: "Task created", body: task };
    },
    {
      requireAuth: true,
      body: t.Object({
        title: t.String(),
        description: t.String(),
      }),
    },
  );
