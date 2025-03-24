import { Reservation } from "@domain/models/Reservation";
import { User } from "@domain/models/User";
import { Book } from "@domain/models/Book";

/**
 * Factory responsible for creating Reservation entities.
 *
 * This implements the Factory Design Pattern and encapsulates
 * the logic for initializing a reservation with default values,
 * such as setting the current date and automatic expiration.
 */
export class ReservationFactory {
  /**
   * Creates a new Reservation instance for a given user and book.
   * The reservation will automatically expire 3 days after creation.
   *
   * @param {User} user - The user making the reservation.
   * @param {Book} book - The book being reserved.
   * @returns {Reservation} - A fully initialized reservation entity.
   */
  static create(user: User, book: Book): Reservation {
    const now = new Date();
    const expires = new Date();
    expires.setDate(now.getDate() + 3);

    return new Reservation(user, book, now, expires);
  }
}
