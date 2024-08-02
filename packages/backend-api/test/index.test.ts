// test/index.test.ts
import { describe, expect, it } from "bun:test";
import { api } from "../src";

describe("Elysia", () => {
  it("server is running", async () => {
    const { data } = await api.index.get();

    expect(data).toBe("Server is running!");
  });
});
