// src/client/observers/ReservationObserverFactory.ts
import { ReservationNotifier } from "./ReservationNotifier";
import { useAlert } from "@client/context/AlertContext";
import { IObserver } from "./IObserver";
import { IReservation } from "@app/types/entities/Reservation";

export const createReservationNotifier = (
  onRefresh: () => void,
  alert: ReturnType<typeof useAlert>
): ReservationNotifier => {
  const notifier = new ReservationNotifier();

  const toastObserver: IObserver<IReservation> = {
    update: () => alert.notify("success", "Reserva realizada con éxito."),
  };

  const refreshObserver: IObserver<IReservation> = {
    update: () => onRefresh(),
  };

  notifier.subscribe(toastObserver);
  notifier.subscribe(refreshObserver);

  return notifier;
};
