import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});
