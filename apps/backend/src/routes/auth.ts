import Elysia, { error } from "elysia";
import { jwtConfig } from "../middlewares/auth";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import db from "../db/db";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(jwtConfig)
  .post("/register", async ({ request }) => {
    const { first_name, last_name, email, password } = await request.json();

    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length) {
      return error(409, { message: "User already exists" });
    }

    const hashedPassword = await Bun.password.hash(password);

    const [newUser] = await db
      .insert(users)
      .values({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      })
      .returning();

    return { id: newUser.user_id, email: newUser.email };
  })
  .post("/login", async ({ jwt, cookie, request }) => {
    const { email, password } = await request.json();

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return error(401, { message: "User does not exist" });
    }

    const passwordMatch = await Bun.password.verify(password, user.password);

    if (!passwordMatch) {
      return error(401, { message: "Invalid password" });
    }

    const token = await jwt.sign({ id: user.user_id, email: user.email });

    cookie.auth.set({
      value: token,
      httpOnly: true,
      maxAge: 7 * 86400,
      sameSite: "none",
      secure: false,
      path: "/",
    });

    return { message: "Login successful", token };
  });
