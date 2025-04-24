import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { User } from "@domain/models/User";
import { Book } from "@domain/models/Book";
import { Reservation } from "@domain/models/Reservation";
import { ReservationFactory } from "@domain/factories/ReservationFactory";
import { ReservationQueryBuilder } from "@domain/builders/ReservationQueryBuilder";

import { AppDataSource } from "@infra/database/data-source";
import { AuthRequest } from "@infra/middleware/auth.middleware";

import { CreateReservationDto } from "@app/dtos/reservations/CreateReservationDto";
import { renderAdminBooksView } from "@presentation/renders/renderAdminBooks";
import { renderAdminReservationsView } from "@presentation/renders/renderAdminReservations";

const userRepo = AppDataSource.getRepository(User);
const bookRepo = AppDataSource.getRepository(Book);
const reservationRepo = AppDataSource.getRepository(Reservation);

export const createReservationController = async (
  req: AuthRequest,
  res: Response
) => {
  const dto = plainToInstance(CreateReservationDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
  }

  const user = await userRepo.findOneBy({ id: dto.userId });
  const book = await bookRepo.findOneBy({ id: dto.bookId });

  if (!user || !book) {
    res.status(404).json({ message: "Usuario o libro no encontrado" });
    return;
  }

  if (book.quantity <= 0) {
    res
      .status(400)
      .json({ message: "No hay stock disponible para este libro" });
    return;
  }

  //Use Abstract Factory Pattern
  const max = req.userBehavior?.maxReservations() ?? 0;
  const currentReservations = await reservationRepo.countBy({
    user: { id: req.user?.id },
  });


  if (currentReservations >= max) {
    res.status(403).json({ message: "Has alcanzado el límite de reservas" });
    return;
  }

  book.quantity -= 1;
  await bookRepo.save(book);

  const reservation = ReservationFactory.create(user, book);
  const saved = await reservationRepo.save(reservation);

  res.status(201).json(saved);
};

export const getReservationsController = async (
  _req: Request,
  res: Response
) => {
  const reservations = await reservationRepo.find({
    relations: ["user", "book"],
  });
  res.json(reservations);
};

export const getMyReservationsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }

    //Pattern Builder
    const reservations = await new ReservationQueryBuilder()
      .withUserId(userId)
      .onlyActive()
      .orderedByDate()
      .build();

    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};


export const getReservationsAdminController = async (
  req: AuthRequest,
  res: Response
) => {
  const reservations = await reservationRepo.find({
    relations: ["user", "book"],
  });
  const html = renderAdminReservationsView(reservations, req.user!);
  res.send(html);
};
