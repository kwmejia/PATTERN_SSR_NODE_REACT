/**
 * Interface defining the behavioral contract for a user
 * according to their role (e.g., admin, regular user).
 *
 * This interface is the cornerstone of the Abstract Factory Pattern
 * used in the system to encapsulate different user permissions
 * and capabilities based on their assigned role.
 */
export interface UserBehavior {
  /**
   * Indicates whether the user is allowed to create new books.
   *
   * @returns {boolean} - True if the user can create books, false otherwise.
   */
  canCreateBooks(): boolean;
  /**
   * Indicates whether the user is allowed to make book reservations.
   *
   * @returns {boolean} - True if the user can reserve books, false otherwise.
   */
  canReserveBooks(): boolean;
  /**
   * Defines the maximum number of active reservations a user can have.
   *
   * @returns {number} - The reservation limit based on the user role.
   */
  maxReservations(): number;
}
