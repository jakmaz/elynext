import Elysia, { error, t } from "elysia";
import { jwtConfig } from "../middlewares/auth";
import { eq } from "drizzle-orm";
import { users } from "../db/schema";
import db from "../db/db";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .post(
    "/register",
    async ({ body }) => {
      const { firstName, lastName, email, password } = body;

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (user) {
        return error(409, { message: "User already exists" });
      }

      const hashedPassword = await Bun.password.hash(password);

      const [newUser] = await db
        .insert(users)
        .values({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        })
        .returning();

      return {
        message: "Register successful",
        body: {
          id: newUser.userId,
          email: newUser.email,
        },
      };
    },
    {
      body: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .post(
    "/login",
    async ({ jwt, cookie, body }) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, body.email));

      if (!user) {
        return error(401, { message: "User does not exist" });
      }

      const passwordMatch = await Bun.password.verify(
        body.password,
        user.password,
      );

      if (!passwordMatch) {
        return error(401, { message: "Invalid password" });
      }

      const token = await jwt.sign({ id: user.userId, email: user.email });

      cookie.auth.set({
        value: token,
        httpOnly: true,
        maxAge: 7 * 86400,
        sameSite: "none",
        secure: false,
        path: "/",
      });

      return { message: "Login successful", token };
    },
    { body: t.Object({ email: t.String(), password: t.String() }) },
  );
