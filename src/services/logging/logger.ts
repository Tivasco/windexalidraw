import { format } from 'date-fns';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  public debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  public info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  public warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  public error(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, context);
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    if (this.shouldLog(level)) {
      const entry: LogEntry = {
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
        level,
        message,
        context
      };

      this.logs.push(entry);
      this.trimLogs();
      this.outputLog(entry);

      // If it's an error, we might want to send it to an error reporting service
      if (level === LogLevel.ERROR) {
        this.reportError(entry);
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private trimLogs(): void {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private outputLog(entry: LogEntry): void {
    const formattedMessage = `[${entry.timestamp}] ${entry.level}: ${entry.message}`;
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formattedMessage, entry.context);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, entry.context);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, entry.context);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage, entry.context);
        break;
    }
  }

  private reportError(entry: LogEntry): void {
    // TODO: Implement error reporting service integration
    // This could be Sentry, LogRocket, or any other error reporting service
    // Example:
    // Sentry.captureException(new Error(entry.message), {
    //   extra: entry.context
    // });
  }

  public getLogs(): LogEntry[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 