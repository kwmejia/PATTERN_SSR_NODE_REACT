/**
 * Represents the payload structure of a decoded JSON Web Token (JWT).
 *
 * This interface is used to define the expected claims embedded in the JWT,
 * and helps ensure type safety when decoding and accessing token data.
 *
 * It is typically attached to the request object after token verification.
 */
export interface JwtPayload {
  /**
   * The unique identifier of the authenticated user.
   */
  id: string;
  /**
   * The email address of the authenticated user.
   */
  email: string;
  /**
   * The role of the user, used to determine access and behavior.
   * Could be "admin" or "user".
   */
  role: "admin" | "user";
}
