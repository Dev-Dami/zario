import { Logger } from './core/Logger';
import { LogLevel } from './core/LogLevel';
import { ConsoleTransport, FileTransport, Transport, consoleT, fileT } from './transports';
import { TransportConfig, LoggerConfig } from './types/index';
import { CustomLogLevelConfig } from './core/CustomLogLevel';

export { Logger, ConsoleTransport, FileTransport, consoleT, fileT };
export type { LogLevel, Transport, TransportConfig, LoggerConfig, CustomLogLevelConfig };
export default Logger;
