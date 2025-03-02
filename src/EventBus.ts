export interface EventBus<T> {
  on(event: string, listener: (data: T) => boolean | void, index?: number): void;
  off(event: string, listener: (data: T) => boolean | void): void;
  emit(event: string, data: T): void;
}
