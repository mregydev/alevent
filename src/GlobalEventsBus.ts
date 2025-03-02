import { EventBus } from './EventBus';

export class GlobalEventBus<T> implements EventBus<T> {
  private handlers: Map<string, Array<(data: T) => boolean | void>> = new Map();

  on(event: string, listener: (data: T) => boolean | void, index: number = -1): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }

    const handlers = this.handlers.get(event)!;
    if (index < 0 || index >= handlers.length) {
      handlers.push(listener);
    } else {
      handlers.splice(index, 0, listener);
    }

    window.addEventListener(event, this.dispatchHandler as EventListener);
  }

  off(event: string, listener: (data: T) => boolean | void): void {
    if (this.handlers.has(event)) {
      this.handlers.set(event, this.handlers.get(event)!.filter(h => h !== listener));
      if (this.handlers.get(event)!.length === 0) {
        window.removeEventListener(event, this.dispatchHandler as EventListener);
      }
    }
  }

  emit(event: string, data: T): void {
    window.dispatchEvent(new CustomEvent(event, { detail: { data, stopPropagation: false } }));
  }

  private dispatchHandler = <T>(e: Event): void => {
    if (!(e instanceof CustomEvent)) return;

    const eventName = e.type;
    if (!this.handlers.has(eventName)) return;

    for (const handler of this.handlers.get(eventName)!) {
      if (e.detail.stopPropagation) break;

      if (handler(e.detail.data) === false) {
        e.detail.stopPropagation = true;
      }
    }
  };
}
