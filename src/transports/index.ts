import { ConsoleTransport, ConsoleTransportOptions } from "./ConsoleTransport";
import { FileTransport, FileTransportOptions } from "./FileTransport";

export * from "./Transport";
export * from "./ConsoleTransport";
export * from "./FileTransport";

// Transport factory functions for easier API use
export function consoleT(options?: ConsoleTransportOptions): ConsoleTransport {
  return new ConsoleTransport(options);
}

export function fileT(options: FileTransportOptions): FileTransport {
  return new FileTransport(options);
}
