import { User } from "@domain/models/User";
import bcrypt from "bcrypt";

export class UserFactory {
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
