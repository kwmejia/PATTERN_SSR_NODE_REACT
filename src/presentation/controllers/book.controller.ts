import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { Book } from "@domain/models/Book";
import { BookFactory } from "@domain/factories/BookFactory";
import { AppDataSource } from "@infra/database/data-source";
import { CreateBookDto } from "@app/dtos/books/CreateBookDto";
import { CloneBookDto } from "@app/dtos/books/CloneBookDto";

const bookRepo = AppDataSource.getRepository(Book);

export const createBookController = async (req: Request, res: Response) => {
  const dto = plainToInstance(CreateBookDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
  }

  try {
    const book = BookFactory.create(
      dto.title,
      dto.author,
      dto.quantity,
      new Date(dto.publishedAt)
    );

    const savedBook = await bookRepo.save(book);
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(500).json({ message: "Error al crear libro" });
  }
};

export const getBooksController = async (_req: Request, res: Response) => {
  try {
    const books = await bookRepo.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener libros" });
  }
};

export const cloneBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // This regex ensures the provided ID is a valid UUID (version agnostic),
  // which helps prevent path traversal or malformed ID injection attacks.
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(id)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  const dto = plainToInstance(CloneBookDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos inválidos", errors });
    return;
  }

  try {
    const original = await bookRepo.findOneBy({ id });

    if (!original) {
      res.status(404).json({ message: "Libro no encontrado" });
      return;
    }

    const cloned = original.clone();
    if (dto.title) cloned.title = dto.title;
    if (dto.quantity) cloned.quantity = dto.quantity;
    if (dto.publishedAt) cloned.publishedAt = new Date(dto.publishedAt);

    const saved = await bookRepo.save(cloned);
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al clonar libro:", error);
    res.status(500).json({ message: "Error al clonar libro" });
  }
};
