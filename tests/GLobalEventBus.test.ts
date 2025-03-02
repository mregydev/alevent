import { GlobalEventBus } from '../src/GlobalEventsBus';

describe('GlobalEventBus', () => {
  let bus: GlobalEventBus<string>;

  beforeEach(() => {
    bus = new GlobalEventBus();
  });

  test('should call event handler in correct order', (done) => {
    const logs: string[] = [];

    bus.on('test', (msg) => {logs.push(`Handler 1: ${msg}`)}, 0);
    bus.on(
      'test',
      (msg) => {
        logs.push(`Handler 2: ${msg}`);
      },
      1
    );

    bus.emit('test', 'Hello');

    setTimeout(() => {
      expect(logs).toEqual(['Handler 1: Hello', 'Handler 2: Hello']);
      done();
    }, 50);
  });

  test('should stop propagation if handler returns false', (done) => {
    const logs: string[] = [];

    bus.on('test', (msg) => {logs.push(`Handler 1: ${msg}`)}, 0);
    bus.on('test', (msg) => {
      logs.push(`Handler 2: ${msg}`);
      return false;
    }, 1);
    bus.on('test', (msg) => {logs.push(`Handler 3: ${msg}`)}, 2);

    bus.emit('test', 'Hello');

    setTimeout(() => {
      expect(logs).toEqual(['Handler 1: Hello', 'Handler 2: Hello']);
      done();
    }, 50);
  });

  test('should not call removed listener', (done) => {
    const logs: string[] = [];
    const listener = (msg: string) => {
      logs.push(`Handler: ${msg}`);
    };

    bus.on('test', listener);
    bus.off('test', listener);

    bus.emit('test', 'Hello');

    setTimeout(() => {
      expect(logs).toEqual([]);
      done();
    }, 50);
  });
});
