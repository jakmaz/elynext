import { afterAll, describe, expect, it } from "bun:test";
import db from "../src/db/db";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { api } from "backend-api";

const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

describe("Auth Routes", () => {
  afterAll(async () => {
    // Clean up
    await db.delete(users).where(eq(users.email, testUser.email));
  });

  it("should register a new user successfully", async () => {
    const { data, status } = await api.auth.register.post(testUser);

    expect(status).toBe(200);
    expect(data?.body.id).toBeTruthy();
    expect(data?.body.email).toBe(testUser.email);

    // Verify the user is in the database
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, testUser.email));
    expect(user).not.toBeNull();
    expect(user.email).toBe(testUser.email);
  });

  it("should not register a user with an existing email", async () => {
    const { error, status } = await api.auth.register.post(testUser);

    expect(status).toBe(409);
    expect(error?.value.message).toBe("User already exists");
  });

  it("should login successfully with correct credentials", async () => {
    const { data, status } = await api.auth.login.post({
      email: testUser.email,
      password: testUser.password,
    });

    expect(status).toBe(200);
    expect(data?.token).toBeTruthy();
    expect(data?.message ?? "").toBe("Login successful");
  });

  it("should not login with incorrect password", async () => {
    const { error, status } = await api.auth.login.post({
      email: testUser.email,
      password: "wrongpassword",
    });

    expect(status).toBe(401);
    expect(error?.value.message).toBe("Invalid password");
  });

  it("should not login with non-existent email", async () => {
    const { error, status } = await api.auth.login.post({
      email: "non.existent@example.com",
      password: "password123",
    });

    expect(status).toBe(401);
    expect(error?.value.message).toBe("User does not exist");
  });
});
