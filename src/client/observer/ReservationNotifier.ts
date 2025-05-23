// src/client/observers/ReservationNotifier.ts
import { IObserver } from "./IObserver";
import { IReservation } from "@app/types/entities/Reservation";

export class ReservationNotifier {
  private observers: IObserver<IReservation>[] = [];

  subscribe(observer: IObserver<IReservation>) {
    this.observers.push(observer);
  }

  notify(data: IReservation) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
