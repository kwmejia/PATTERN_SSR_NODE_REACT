import { Book } from "@domain/models/Book";

/**
 * Factory para crear libros
 */
export class BookFactory {
  static create(
    title: string,
    author: string,
    quantity: number,
    publishedAt: Date
  ): Book {
    // Aquí podrías incluir validaciones, formateo, etc.
    return new Book(title, author, quantity, publishedAt);
  }
}
