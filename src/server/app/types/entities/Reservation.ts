import { Book } from "@domain/models/Book";

export interface IReservation {
  id: string;
  reservedAt: string;
  expiresAt: string;
  book: Book;
}
