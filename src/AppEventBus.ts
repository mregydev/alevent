import  {EventBus}  from './EventBus';

export class AppEventBus<T> implements EventBus<T> {
  private events: Map<string, Array<(data: T) => boolean | void>> = new Map();

  on(event: string, listener: (data: T) => boolean | void, index: number = -1): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    const handlers = this.events.get(event)!;
    if (index < 0 || index >= handlers.length) {
      handlers.push(listener);
    } else {
      handlers.splice(index, 0, listener);
    }
  }

  off(event: string, listener: (data: T) => boolean | void): void {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event)!.filter(h => h !== listener));
    }
  }

  emit(event: string, data: T): void {
    if (this.events.has(event)) {
      for (const handler of this.events.get(event)!) {
        if (handler(data) === false) break;
      }
    }
  }
}
