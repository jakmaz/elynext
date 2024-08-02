import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../env";

const client = postgres({
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  database: env.dbDatabase,
});

const db = drizzle(client);

export default db;
