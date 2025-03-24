import { User } from "@domain/models/User";
import bcrypt from "bcrypt";

/**
 * Factory responsible for creating `User` entities.
 *
 * This class follows the Factory Design Pattern and encapsulates
 * the logic needed to instantiate a `User`, including password hashing
 * and role assignment.
 */
export class UserFactory {
  /**
   * Creates a new `User` instance with a securely hashed password.
   *
   * @param {string} name - The full name of the user.
   * @param {string} email - The user's email address.
   * @param {string} password - The raw password to be hashed.
   * @param {"admin" | "user"} [role="user"] - The role assigned to the user.
   * @returns {Promise<User>} - A new `User` entity ready to be persisted.
   */
  static async create(
    name: string,
    email: string,
    password: string,
    role: "admin" | "user" = "user"
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new User(name, email, hashedPassword, role);
  }
}
