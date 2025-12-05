/**
 * Basic performance benchmarks for the logger
 */
import { Logger } from '../../src/core/Logger';

describe('Basic Performance Tests', () => {
  test('should handle high-frequency logging efficiently', () => {
    const logger = new Logger({ 
      level: 'info', 
      transports: [{ type: 'console' }],
      timestamp: false
    });

    const iterations = 10000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      logger.info(`Performance test message ${i}`, { id: i, test: 'perf' });
    }

    const end = performance.now();
    const duration = end - start;
    
    // Should be able to handle 10k logs quickly
    expect(duration).toBeLessThan(5000); // Less than 5 seconds for 10k logs
    
    console.log(`\n✅ Logged ${iterations} messages in ${duration.toFixed(2)}ms (${(iterations / duration * 1000).toFixed(0)} ops/sec)`);
  });

  test('should handle high-frequency logging with filtering efficiently', () => {
    const logger = new Logger({ 
      level: 'error', // This will filter out all the info messages 
      transports: [{ type: 'console' }],
      timestamp: false
    });

    const iterations = 50000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      logger.info(`Filtered message ${i}`, { id: i, test: 'perf' });
    }

    const end = performance.now();
    const duration = end - start;
    
    // Should be much faster since messages are filtered before processing
    expect(duration).toBeLessThan(1000); // Less than 1 second for 50k filtered logs
    
    console.log(`\n✅ Filtered out ${iterations} messages in ${duration.toFixed(2)}ms (${(iterations / duration * 1000).toFixed(0)} ops/sec)`);
  });

  test('should handle high-frequency logging with metadata efficiently', () => {
    const logger = new Logger({ 
      level: 'info', 
      transports: [{ type: 'console' }],
      timestamp: false
    });

    const iterations = 5000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      logger.info(`Message with metadata ${i}`, { 
        id: i, 
        user: `user_${i % 100}`, 
        action: `action_${i % 10}`,
        complex: { nested: { data: i, arr: [i, i+1, i+2] } }
      });
    }

    const end = performance.now();
    const duration = end - start;
    
    expect(duration).toBeLessThan(2000); // Less than 2 seconds for 5k logs with complex metadata
    
    console.log(`\n✅ Logged ${iterations} messages with complex metadata in ${duration.toFixed(2)}ms (${(iterations / duration * 1000).toFixed(0)} ops/sec)`);
  });

  test('should handle JSON formatting efficiently', () => {
    const logger = new Logger({ 
      level: 'info', 
      json: true,
      transports: [{ type: 'console' }],
      timestamp: false
    });

    const iterations = 10000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      logger.info(`JSON message ${i}`, { id: i, format: 'json' });
    }

    const end = performance.now();
    const duration = end - start;
    
    expect(duration).toBeLessThan(3000); // Less than 3 seconds for 10k JSON logs
    
    console.log(`\n✅ Logged ${iterations} JSON messages in ${duration.toFixed(2)}ms (${(iterations / duration * 1000).toFixed(0)} ops/sec)`);
  });
});