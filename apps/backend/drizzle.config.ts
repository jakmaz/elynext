import type { Config } from "drizzle-kit";

const dbCredentials = {
  url: "file:./todos.db",
};

export default {
  dbCredentials,
  dialect: "sqlite",
  driver: "turso",
  out: "./drizzle",
  breakpoints: true,
  schema: "./src/db/schema.ts",
} satisfies Config;
