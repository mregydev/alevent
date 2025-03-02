import { AppEventBus } from '../src/AppEventBus';

describe('AppEventBus', () => {
  let bus: AppEventBus<string>;

  beforeEach(() => {
    bus = new AppEventBus();
  });

  test('should call event handler in correct order', () => {
    const logs: string[] = [];

    bus.on(
      'test',
      (msg) => {
        logs.push(`Handler 1: ${msg}`);
      },
      0
    );
    bus.on(
      'test',
      (msg) => {
        logs.push(`Handler 2: ${msg}`);
      },
      1
    );

    bus.emit('test', 'Hello');

    expect(logs).toEqual(['Handler 1: Hello', 'Handler 2: Hello']);
  });

  test('should stop propagation if handler returns false', () => {
    const logs: string[] = [];

    bus.on(
      'test',
      (msg) => {
        logs.push(`Handler 1: ${msg}`);
      },
      0
    );
    bus.on('test', (msg) => {
      logs.push(`Handler 2: ${msg}`);
      return false;
    }, 1);
    bus.on(
      'test',
      (msg) => {
        logs.push(`Handler 3: ${msg}`);
      },
      2
    );

    bus.emit('test', 'Hello');

    expect(logs).toEqual(['Handler 1: Hello', 'Handler 2: Hello']);
  });

  test('should not call removed listener', () => {
    const logs: string[] = [];
    const listener = (msg: string) => {
      logs.push(`Handler: ${msg}`);
    };

    bus.on('test', listener);
    bus.off('test', listener);

    bus.emit('test', 'Hello');

    expect(logs).toEqual([]);
  });
});
