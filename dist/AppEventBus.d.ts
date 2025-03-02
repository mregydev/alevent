import { EventBus } from './EventBus';
export declare class AppEventBus<T> implements EventBus<T> {
    private events;
    on(event: string, listener: (data: T) => boolean | void, index?: number): void;
    off(event: string, listener: (data: T) => boolean | void): void;
    emit(event: string, data: T): void;
}
