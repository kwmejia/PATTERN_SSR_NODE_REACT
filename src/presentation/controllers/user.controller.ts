import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { User } from "@domain/models/User";
import { UserFactory } from "@domain/factories/UserFactory";
import { AppDataSource } from "@infra/database/data-source";
import { CreateUserDto } from "@app/dtos/users/CreateUserDto";

const userRepo = AppDataSource.getRepository(User);

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dto = plainToInstance(CreateUserDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
    return;
  }

  const existingUser = await userRepo.findOneBy({ email: dto.email });
  if (existingUser) {
    res.status(409).json({ message: "El correo ya está registrado" });
    return;
  }

  try {
    const user = await UserFactory.create(
      dto.name,
      dto.email,
      dto.password,
      dto.role
    );
    const savedUser = await userRepo.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const getUsersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const users = await userRepo.find();
  res.json(users);
};
