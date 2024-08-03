import pc from "picocolors";
import Elysia from "elysia";
import * as fmt from "./formatters";
import { formatTimestamp } from "./formatters";

interface Options {
  showBanner?: boolean;
  logLevel?: "info" | "warn" | "error";
  logRequest?: boolean;
  logResponse?: boolean;
  includeTimestamp?: boolean;
  logToFile?: string;
}

// Function to print the banner
function printBanner(duration: number, serverUrl: string) {
  console.log(
    `🚚 ${pc.green(`${pc.bold("Elysia server")}`)} ${pc.gray("started in")} ${pc.bold(duration.toFixed(2))} ms\n`,
  );
  console.log(
    `${pc.green(" ➜ ")} ${pc.bold("Server")}:   ${pc.cyan(serverUrl)}`,
  );
  console.log(
    `${pc.green(" ➜ ")} ${pc.bold("Database")}: ${pc.cyan("sqlite")}`,
    "\n",
  );
}

// Determine if the log level allows logging the current message
const shouldLog = (
  level: "info" | "warn" | "error",
  logLevel: "info" | "warn" | "error" = "info",
) => {
  const levels = { info: 0, warn: 1, error: 2 };
  return levels[level] >= levels[logLevel];
};

// Function to log messages
const logMessage = (components: string[], logToFile?: string) => {
  const message = components.join(" ");
  if (logToFile) {
    Bun.write(logToFile, message + "\n");
  } else {
    console.log(message);
  }
};

// Logger middleware
export const logger = (options?: Options) => {
  const startTime = performance.now();

  return new Elysia({ name: "@jakmaz/logely" })
    .state("requestStartTime", [Number.NaN, Number.NaN] as [number, number])
    .onRequest(({ store, request }) => {
      store.requestStartTime = process.hrtime();
      if (options?.logRequest && shouldLog("info", options?.logLevel)) {
        console.log(pc.dim("Request:"));
        console.log(request);
      }
    })
    .onAfterResponse({ as: "global" }, ({ request, set, store, response }) => {
      const url = new URL(request.url);
      const duration = store.requestStartTime;

      const components: string[] = [
        pc.green("✓"),
        pc.bold(fmt.method(request.method)),
        url.pathname,
        fmt.status(set.status) ?? "",
        pc.dim(`[${fmt.duration(duration)}]`),
      ];

      if (options?.includeTimestamp) {
        components.unshift(pc.dim(formatTimestamp(new Date())));
      }

      if (shouldLog("info", options?.logLevel)) {
        logMessage(components.filter(Boolean), options?.logToFile);
      }

      if (options?.logResponse && shouldLog("info", options?.logLevel)) {
        console.log(pc.dim("Response:"));
        console.log(response);
      }
    })
    .onError({ as: "global" }, ({ request, error, store }) => {
      const url = new URL(request.url);
      const duration = store.requestStartTime;
      const status = "status" in error ? error.status : "-/-";

      const components: string[] = [
        pc.red("✗"),
        pc.bold(fmt.method(request.method)),
        url.pathname,
        fmt.status(status) ?? "",
        pc.dim(`[${fmt.duration(duration)}]`),
      ];

      if (options?.includeTimestamp) {
        components.unshift(pc.dim(formatTimestamp(new Date())));
      }

      if (shouldLog("error", options?.logLevel)) {
        logMessage(components.filter(Boolean), options?.logToFile);
      }
    })
    .onStart(({ server }) => {
      if (options?.showBanner !== false && server) {
        const duration = performance.now() - startTime;
        printBanner(duration, String(server.url));
      }
    });
};
