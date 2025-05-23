// src/client/observers/ReservationNotifier.ts
import { IObserver } from "./IObserver";
import { IReservation } from "@app/types/entities/Reservation";

export class ReservationNotifier {
  // Array de observadores (Mensajes o Notificaciones que se enviarán a los observadores)
  private observers: IObserver<IReservation>[] = [];

  // Agregar un observador al array
  subscribe(observer: IObserver<IReservation>) {
    this.observers.push(observer);
  }

  // Notificar a todos los observadores
  notify(data: IReservation) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
