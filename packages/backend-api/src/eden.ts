import { treaty } from "@elysiajs/eden";
import { app } from "backend";

export const api = treaty(app);

export type GetTreatyType<T extends () => any> = Awaited<ReturnType<T>>["data"];
