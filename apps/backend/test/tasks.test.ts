import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import db from "../src/db/db";
import { tasks, users } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { api } from "backend-api";

const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

const testTask = {
  title: "Test Task",
  description: "This is a test task",
};

let authToken: string | undefined;

describe("Task Routes", () => {
  beforeAll(async () => {
    // Register and login the test user
    await api.auth.register.post(testUser);
    const { data } = await api.auth.login.post({
      email: testUser.email,
      password: testUser.password,
    });
    authToken = data?.token;
  });

  afterAll(async () => {
    // Clean up
    await db.delete(tasks).where(eq(tasks.title, testTask.title));
    await db.delete(users).where(eq(users.email, testUser.email));
  });

  it("should create a new task successfully", async () => {
    const { data, status } = await api.tasks.index.post(testTask, {
      headers: { Cookie: `auth=${authToken}` },
    });

    expect(status).toBe(200);
    expect(data?.body.id).toBeTruthy();
    expect(data?.body.title).toBe(testTask.title);

    // Verify the task is in the database
    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.title, testTask.title));
    expect(task).not.toBeNull();
    expect(task.title).toBe(testTask.title);
  });

  it("should retrieve the created task", async () => {
    const { data, status } = await api.tasks.index.get({
      headers: { Cookie: `auth=${authToken}` },
    });

    expect(status).toBe(200);
    expect(data?.body).toHaveLength(1);
    expect(data?.body[0].title).toBe(testTask.title);
  });

  it("should not create a task without authentication", async () => {
    const { status } = await api.tasks.index.post(testTask);

    expect(status).toBe(401);
  });
});
