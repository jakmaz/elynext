import pc from "picocolors";

export function duration(hrtime: [number, number]): string {
  const [seconds, nanoseconds] = process.hrtime(hrtime);
  const durationInMicroseconds = (seconds * 1e9 + nanoseconds) / 1e3;
  const durationInMilliseconds = durationInMicroseconds / 1e3;

  if (seconds > 0) {
    return `${seconds.toFixed(2)}s`;
  }
  if (durationInMilliseconds > 1) {
    return `${durationInMilliseconds.toFixed(2)}ms`;
  }
  if (durationInMicroseconds > 1) {
    return `${durationInMicroseconds.toFixed(2)}µs`;
  }
  if (nanoseconds > 0) {
    return `${nanoseconds.toFixed(2)}ns`;
  }

  return "-/-";
}

// Function to format the timestamp
export function formatTimestamp(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `[${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}]`;
}

const methodColors: Record<string, (text: string) => string> = {
  GET: pc.green,
  POST: pc.blue,
  PUT: pc.yellow,
  DELETE: pc.red,
  PATCH: pc.magenta,
  OPTIONS: pc.cyan,
  HEAD: pc.gray,
};

export function method(method: string): string {
  return methodColors[method]?.(method) ?? method;
}

const statusColors: Record<number, (text: string) => string> = {
  200: pc.green,
  201: pc.blue,
  204: pc.yellow,
  400: pc.red,
  401: pc.magenta,
  403: pc.cyan,
  404: pc.gray,
  500: pc.gray,
};

export function status(
  status: number | string | undefined,
): string | undefined {
  const statusNumber =
    typeof status === "string" ? parseInt(status, 10) : status;
  return statusNumber !== undefined && statusNumber in statusColors
    ? statusColors[statusNumber](String(statusNumber))
    : String(status);
}
