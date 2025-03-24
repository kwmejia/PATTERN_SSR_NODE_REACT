import { Book as EntityBook } from "@domain/models/Book";
import { Book as ClientBook } from "@app/types/entities/Books";
/**
 * Adapter class to transform Book entities from the domain layer (TypeORM)
 * into a simplified format (DTO) suitable for the client-side (React).
 *
 * This follows the Adapter Design Pattern, allowing decoupling between
 * the domain models and client interfaces.
 */
export class BookAdapter {
  /**
   * Transforms a single EntityBook into a ClientBook DTO.
   *
   * Ensures proper formatting of the `publishedAt` date,
   * regardless of whether it comes as a string or a Date object.
   *
   * @param {EntityBook} book - The original Book entity from the database.
   * @returns {ClientBook} - A plain object ready to be used on the client.
   */
  static toClient(book: EntityBook): ClientBook {
    const date = new Date(book.publishedAt);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      quantity: book.quantity,
      publishedAt: date.toDateString() || "",
    };
  }

  /**
   * Transforms an array of Book entities into an array of ClientBook DTOs.
   *
   * @param {EntityBook[]} books - List of books from the database.
   * @returns {ClientBook[]} - List of client-friendly book objects.
   */
  static toClientMany(books: EntityBook[]): ClientBook[] {
    return books.map(this.toClient);
  }
}
