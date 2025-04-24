import { UserBehavior } from "@domain/factories/behavior/UserBehavior";
import { UserFactoryRole } from "@domain/factories/behavior/UserFactoryRole";

/**
 * Factory class for creating admin-specific user behavior.
 *
 * This is a concrete implementation of the Abstract Factory Pattern,
 * responsible for generating a `UserBehavior` instance tailored to users
 * with the 'admin' role.
 *
 * Admins have full permissions in the system:
 * - They can create books
 * - They can reserve books
 * - They have no reservation limit
 */

export class AdminUserFactory implements UserFactoryRole {
  /**
   * Creates a UserBehavior object with the capabilities granted to admin users.
   *
   * @returns {UserBehavior} - Behavior implementation with full access.
   */
  createBehavior(): UserBehavior {
    return {
      canCreateBooks: () => true,
      canReserveBooks: () => true,
      maxReservations: () => Infinity,  // Admins have no limit
    };
  }
}
