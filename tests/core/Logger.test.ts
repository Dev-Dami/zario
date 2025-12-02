import { Logger } from "../../src/core/Logger";
import { LogLevel } from "../../src/core/LogLevel";
import { Transport } from "../../src/transports/Transport";
import { Formatter } from "../../src/core/Formatter";
import { LogData } from "../../src/types";

// Mock Transport for testing
class MockTransport implements Transport {
  public logs: LogData[] = [];
  write(data: LogData, formatter: Formatter): void {
    this.logs.push(data);
  }
}

describe("Logger - Child Loggers", () => {
  let parentLogger: Logger;
  let mockTransport: MockTransport;

  beforeEach(() => {
    mockTransport = new MockTransport();
    parentLogger = new Logger({
      level: "info",
      prefix: "PARENT",
      timestamp: true,
      transports: [{ type: "custom", instance: mockTransport }], // Pass mock transport directly
      context: { parentId: 123 },
    });
  });

  test("child logger should inherit settings from parent", () => {
    const childLogger = parentLogger.createChild();

    expect((childLogger as any).level).toBe("info");
    expect((childLogger as any).prefix).toBe("PARENT");
    expect((childLogger as any).timestamp).toBe(true);
    expect((childLogger as any).transports[0]).toBe(mockTransport); // Should inherit transports
  });

  test("child logger should override parent settings if provided", () => {
    const childLogger = parentLogger.createChild({
      level: "debug",
      prefix: "CHILD",
      timestamp: false,
    });

    expect((childLogger as any).level).toBe("debug");
    expect((childLogger as any).prefix).toBe("CHILD");
    expect(childLogger.getTimestampSetting()).toBe(false);
    expect((childLogger as any).transports[0]).toBe(mockTransport); // Still inherits transports
  });

  test("child logger should merge context from parent and its own", () => {
    const childLogger = parentLogger.createChild({
      context: { childId: 456, commonKey: "childValue" },
    });

    childLogger.info("Test message", { logSpecific: "data" });

    expect(mockTransport.logs.length).toBe(1);
    const logData = mockTransport.logs[0]!;

    expect(logData.metadata).toEqual({
      parentId: 123,
      childId: 456,
      commonKey: "childValue",
      logSpecific: "data",
    });
  });

  test("child logger should log messages through parent transports", () => {
    const childLogger = parentLogger.createChild({
      prefix: "CHILD",
    });

    childLogger.info("Child message");

    expect(mockTransport.logs.length).toBe(1);
    expect(mockTransport.logs[0]!.message).toBe("Child message");
    expect(mockTransport.logs[0]!.prefix).toBe("CHILD"); // Child's prefix should be used
  });

  test("grandchild logger should inherit and merge correctly", () => {
    const childLogger = parentLogger.createChild({
      context: { childId: 456 },
      prefix: "CHILD",
    });
    const grandchildLogger = childLogger.createChild({
      context: { grandChildId: 789, commonKey: "grandchildValue" },
      prefix: "GRANDCHILD",
    });

    grandchildLogger.warn("Grandchild message", { specific: "value" });

    expect(mockTransport.logs.length).toBe(1);
    const logData = mockTransport.logs[0]!;

    expect(logData.level).toBe("warn");
    expect(logData.message).toBe("Grandchild message");
    expect(logData.prefix).toBe("GRANDCHILD");
    expect(logData.metadata).toEqual({
      parentId: 123,
      childId: 456,
      grandChildId: 789,
      commonKey: "grandchildValue",
      specific: "value",
    });
  });

  test("child logger with no context should still inherit parent context", () => {
    const childLogger = parentLogger.createChild();
    childLogger.info("Message from child without own context");

    expect(mockTransport.logs.length).toBe(1);
    const logData = mockTransport.logs[0]!;
    expect(logData.metadata).toEqual({ parentId: 123 });
  });

  test("child logger with empty context should still inherit parent context", () => {
    const childLogger = parentLogger.createChild({ context: {} });
    childLogger.info("Message from child with empty context");

    expect(mockTransport.logs.length).toBe(1);
    const logData = mockTransport.logs[0]!;
    expect(logData.metadata).toEqual({ parentId: 123 });
  });
});
