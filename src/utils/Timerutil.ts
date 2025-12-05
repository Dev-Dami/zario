export class Timer {
  private startTime: number;
  private name: string;
  private logFn: (message: string) => void;

  constructor(name: string, logFn: (message: string) => void) {
    this.name = name;
    this.logFn = logFn;
    this.startTime = Date.now();
  }

  end(): void {
    const endTime = Date.now();
    const duration = endTime - this.startTime;
    this.logFn(`${this.name} took ${duration}ms`);
  }
}
