import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const client = new Database(":memory:");

const db = drizzle(client);

export default db;
