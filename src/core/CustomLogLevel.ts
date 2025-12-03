export interface CustomLogLevelConfig {
  name: string;
  color: string;
  priority: number;
}

export type LogLevel =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "silent"
  | "boring"
  | string;
