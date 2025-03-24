import { Book } from "@domain/models/Book";

/**
 * Factory responsible for creating Book instances.
 *
 * This follows the Factory Design Pattern by encapsulating
 * the creation logic of `Book` objects and centralizing any
 * validation or formatting that may be required at instantiation time.
 */
export class BookFactory {
  /**
   * Creates a new Book entity with the provided data.
   *
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {number} quantity - The available quantity (stock).
   * @param {Date} publishedAt - The publication date.
   * @returns {Book} - A fully constructed Book entity.
   */
  static create(
    title: string,
    author: string,
    quantity: number,
    publishedAt: Date
  ): Book {
    return new Book(title, author, quantity, publishedAt);
  }
}
