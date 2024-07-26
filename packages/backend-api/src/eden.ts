import { treaty } from "@elysiajs/eden";
import type { App } from "backend";

export const api = treaty<App>("localhost:3000");
