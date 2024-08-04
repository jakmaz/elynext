import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

// Users Table
export const users = sqliteTable("users", {
  userId: integer("user_id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name", { length: 50 }).notNull(),
  lastName: text("last_name", { length: 50 }).notNull(),
  email: text("email", { length: 100 }).notNull().unique(),
  password: text("password", { length: 255 }).notNull(),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Todos Table
export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "number" })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "number" })
    .$onUpdate(() => sql`strftime('%s', 'now')`)
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
});
