import jwt from "@elysiajs/jwt";
import { env } from "../env";
import Elysia, { error } from "elysia";

export type TokenData = {
  id: number;
  email: string;
};

export const jwtConfig = jwt({
  name: "jwt",
  secret: env.jwtSecret,
  exp: "7d",
});

export const jwtValidation = (app: Elysia) =>
  app
    .use(jwtConfig)
    .use(authPlugin)
    .derive(async ({ jwt, cookie }) => {
      const token = cookie.auth.value;
      const user = (await jwt.verify(token)) as TokenData;
      return { user };
    });

const authPlugin = new Elysia({ name: "authPlugin" }).macro(
  ({ onBeforeHandle }) => ({
    requireAuth() {
      onBeforeHandle(({ cookie }) => {
        if (!cookie.auth?.value) {
          return error(401, { message: "No token provided" });
        }
      });
    },
  }),
);
