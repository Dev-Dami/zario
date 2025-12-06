import { LogLevel } from "../core/LogLevel";
import { CustomLogLevelConfig } from "../core/CustomLogLevel";
import { Transport } from "../transports/Transport";
import { ConsoleTransport, ConsoleTransportOptions, FileTransport, FileTransportOptions } from "../transports";

export interface LogData {
  level: LogLevel;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any> | undefined;
  prefix?: string;
}

// Legacy transport options (backward compat)
export interface LegacyTransportOptions {
  type: "console" | "file" | "custom";
  options?: {
    path?: string;
    colorize?: boolean;
    maxSize?: number;
    maxFiles?: number;
  };
  instance?: Transport;
}

// New transport APIs
export type ConsoleTransportFunction = () => ConsoleTransport;
export type FileTransportFunction = (options?: FileTransportOptions) => FileTransport;

// Union type supporting both legacy and new transport configs
export type TransportConfig = LegacyTransportOptions | ConsoleTransportFunction | FileTransportFunction | Transport;

export interface LoggerConfig {
  level?: LogLevel;
  colorize?: boolean;
  json?: boolean;
  transports?: TransportConfig[];
  timestampFormat?: string;
  prefix?: string;
  timestamp?: boolean;
  async?: boolean;
}
