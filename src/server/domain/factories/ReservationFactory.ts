import { Reservation } from "@domain/models/Reservation";
import { User } from "@domain/models/User";
import { Book } from "@domain/models/Book";

/**
 * Crea una reserva con lógica de expiración automática (por ejemplo, 3 días después)
 */
export class ReservationFactory {
  static create(user: User, book: Book): Reservation {
    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + 3); // reserva expira en 3 días

    return new Reservation(user, book, now, expires);
  }
}
