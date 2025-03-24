import { AppDataSource } from "@infra/database/data-source";
import { Reservation } from "@domain/models/Reservation";

/**
 * ReservationQueryBuilder provides a fluent interface to build
 * complex Reservation queries using TypeORM's QueryBuilder.
 *
 * This class implements a variation of the Builder Design Pattern,
 * allowing chainable and readable construction of queries with optional filters.
 */
export class ReservationQueryBuilder {
  /**
   * Internal QueryBuilder instance preloaded with necessary joins.
   */
  private query = AppDataSource.getRepository(Reservation)
    .createQueryBuilder("reservation")
    .leftJoin("reservation.user", "user")
    .leftJoinAndSelect("reservation.book", "book");

  /**
   * Filters reservations by a specific user ID.
   *
   * @param {string} userId - UUID of the user to filter by.
   * @returns {this} - The builder instance (for chaining).
   */
  withUserId(userId: string): this {
    this.query.andWhere("user.id = :userId", { userId });
    return this;
  }

  /**
   * Filters to only active reservations.
   * A reservation is considered active if it has not expired.
   *
   * @returns {this} - The builder instance (for chaining).
   */
  onlyActive(): this {
    this.query.andWhere("reservation.expiresAt > NOW()");
    return this;
  }

  /**
   * Orders reservations by reserved date in descending order.
   *
   * @returns {this} - The builder instance (for chaining).
   */
  orderedByDate(): this {
    this.query.orderBy("reservation.reservedAt", "DESC");
    return this;
  }

  /**
   * Finalizes the query and executes it to return the result.
   *
   * @returns {Promise<Reservation[]>} - List of reservations matching the built query.
   */
  build() {
    return this.query.getMany();
  }
}
