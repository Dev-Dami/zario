import { Logger, ConsoleTransport, FileTransport } from "../src";

// Create a logger with asynchronous logging
const asyncLogger = new Logger({
  level: "info",
  colorize: true,
  asyncMode: true, // Enable asynchronous logging
  transports: [
    new ConsoleTransport(),
    new FileTransport({ path: "./logs/async-app.log" }),
  ],
  prefix: "[Async-App]",
  timestamp: true,
});

console.log("Starting async logging example...");
console.log(
  "Note: Async logging allows the main application to continue without waiting for log I/O operations",
);

// Log some messages; these will be processed in the background
asyncLogger.info("Application started");
asyncLogger.warn("This is a warning message processed asynchronously");
asyncLogger.error("An error occurred", { code: 500, module: "database" });

// Show that the main thread continues immediately
console.log("Main thread continues immediately after logging...");
console.log("Log messages are being written in the background");

// You can also toggle async mode at runtime
asyncLogger.setAsyncMode(false); // Switch back to synchronous mode
asyncLogger.info("Now logging synchronously");

asyncLogger.setAsyncMode(true); // Switch back to async mode
asyncLogger.info("Back to asynchronous logging");

// Child loggers inherit the async setting from parent
const childLogger = asyncLogger.createChild({
  prefix: "[Child-Async]",
  context: { component: "child-logger" },
});

childLogger.debug("Child logger with async mode enabled");
childLogger.info("Child logger inherits async setting from parent");

console.log(
  "Async logging example completed. Check logs/async-app.log for file output.",
);
