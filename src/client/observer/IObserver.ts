// src/client/observers/IObserver.ts
export interface IObserver<T> {
  update(data: T): void;
}
