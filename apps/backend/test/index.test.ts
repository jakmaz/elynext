import { describe, expect, it } from "bun:test";
import db from "../src/dbSqlLite/db";
import { users } from "../src/dbSqlLite/schema";
import { eq } from "drizzle-orm";
import { api } from "backend-api";

const testUser = {
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

describe("Auth Routes", () => {
  it("should register a new user successfully", async () => {
    const response = await api.auth.register.post(testUser);

    expect(response.status).toBe(200);
    expect(response.data?.id).toBeTruthy();
    expect(response.data?.email).toBe(testUser.email);

    // Verify the user is in the database
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, testUser.email));
    expect(user).not.toBeNull();
    expect(user.email).toBe(testUser.email);
  });

  it("should not register a user with an existing email", async () => {
    const response = await api.auth.register.post(testUser);

    expect(response.status).toBe(409);
  });

  it("should login successfully with correct credentials", async () => {
    const response = await api.auth.login.post({
      email: testUser.email,
      password: testUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.data?.token).toBeTruthy();
    expect(response.data?.message ?? "").toBe("Login successful");
  });

  it("should not login with incorrect password", async () => {
    const response = await api.auth.login.post({
      email: testUser.email,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.data?.message ?? "").toBe("Invalid password");
  });

  it("should not login with non-existent email", async () => {
    const response = await api.auth.login.post({
      email: "non.existent@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);
    expect(response.data?.message ?? "").toBe("User does not exist");
  });
});
