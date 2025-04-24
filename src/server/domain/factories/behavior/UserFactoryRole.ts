import { UserBehavior } from "@domain/factories/behavior/UserBehavior";

/**
 * Interface for user role-based behavior factories.
 *
 * This is the abstract factory interface that defines the contract
 * for creating `UserBehavior` objects. Each concrete implementation
 * (e.g., `AdminUserFactory`, `RegularUserFactory`) provides specific
 * capabilities according to the user's role.
 *
 * This abstraction enables easy extension of roles and clean separation
 * of role-specific logic from the core application.
 */
export interface UserFactoryRole {
  /**
   * Creates a `UserBehavior` instance representing the capabilities
   * of a user with a specific role.
   *
   * @returns {UserBehavior} - Behavior definition for the current role.
   */
  createBehavior(): UserBehavior;
}
