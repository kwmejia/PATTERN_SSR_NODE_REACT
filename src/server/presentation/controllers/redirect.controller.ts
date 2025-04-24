import { ROUTES } from "@client/utils/router";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const redirectByRoleController = (req: Request, res: Response): void => {
  const token = req.cookies.token;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      switch (decoded.role) {
        case "admin":
          return res.redirect(ROUTES.ADMIN_BOOKS_PAGE);
        case "user":
          return res.redirect("/users/dashboard");
        default:
          return res.redirect(ROUTES.LOGIN);
      }
    }
  } catch (error) {
    console.warn("🔒 Token inválido:", error);
  }

  // If not have valid token
  return res.redirect(ROUTES.LOGIN);
};
