import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { JwtPayload } from "@app/types/JwtPayload";
import { UserBehavior } from "@domain/factories/behavior/UserBehavior";
import { AdminUserFactory } from "@domain/factories/behavior/AdminUserFactory";
import { RegularUserFactory } from "@domain/factories/behavior/RegularUserFactory";

export interface AuthRequest extends Request {
  user?: JwtPayload;
  userBehavior?: UserBehavior;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Token no encontrado" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded;

    // Abstract Factory según el rol
    const factory =
      decoded.role === "admin"
        ? new AdminUserFactory()
        : new RegularUserFactory();

    req.userBehavior = factory.createBehavior();
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "Solo los administradores pueden realizar esta acción",
    });
    return;
  }
  next();
};
