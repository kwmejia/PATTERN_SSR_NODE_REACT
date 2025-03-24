import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { User } from "@domain/models/User";
import { LoginDto } from "@app/dtos/auth/LoginDto";
import { AppDataSource } from "@infra/database/data-source";
import { AuthRequest } from "@infra/middleware/auth.middleware";
import { renderLogin } from "@presentation/renders/renderLogin";

const userRepo = AppDataSource.getRepository(User);

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validación de datos con DTO
    const dto = plainToInstance(LoginDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ message: "Datos inválidos", errors });
      return;
    }

    const { email, password } = dto;

    const user = await userRepo.findOneBy({ email });
    if (!user) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    });
    

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logoutController = (_req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Sesión cerrada exitosamente" });
};

export const meController = (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "No autenticado" });
    return;
  }

  const { id, email, role } = req.user;
  res.json({ id, email, role });
};

export const getLoginController = (_req: Request, res: Response) => {
  const html = renderLogin();
  res.send(html);
};
