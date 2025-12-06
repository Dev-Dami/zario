import { Logger, consoleT, fileT } from "../src";

// create a logger instance for JSON structured logs
const jsonLogger = new Logger({
  level: "debug",
  json: true,
  transports: [consoleT(), fileT({ path: "./logs/json-logs.json" })],
});

// Log can structure data as JSON
jsonLogger.info("User action", {
  userId: 12345,
  action: "login",
  timestamp: new Date().toISOString(),
  metadata: {
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0...",
  },
});

jsonLogger.error("API Error", {
  statusCode: 500,
  endpoint: "/api/users",
  error: "Database connection failed",
  userId: 67890,
});

jsonLogger.warn("Performance issue", {
  endpoint: "/api/reports",
  responseTime: 5200,
  threshold: 2000,
  unit: "ms",
});
