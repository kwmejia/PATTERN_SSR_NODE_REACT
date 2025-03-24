import { UserBehavior } from "@domain/factories/UserBehavior";
import { UserFactoryRole } from "@domain/factories/UserFactoryRole";

/**
 * Factory class for creating behavior specific to regular (non-admin) users.
 *
 * This is a concrete implementation of the Abstract Factory Pattern,
 * responsible for returning a `UserBehavior` object that defines
 * the permissions and capabilities of a standard user.
 *
 * Regular users:
 * - Cannot create books
 * - Can reserve books
 * - Are limited to 30 active reservations
 */
export class RegularUserFactory implements UserFactoryRole {
  /**
   * Returns a `UserBehavior` object configured for regular users.
   *
   * @returns {UserBehavior} - Behavior definition with restricted permissions.
   */
  createBehavior(): UserBehavior {
    return {
      canCreateBooks: () => false,
      canReserveBooks: () => true,
      maxReservations: () => 30,
    };
  }
}
