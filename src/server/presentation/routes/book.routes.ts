import { Router } from "express";
import {
  cloneBookController,
  createBookController,
  getBooksController,
} from "@presentation/controllers/book.controller";
import { authMiddleware, isAdmin } from "@infra/middleware/auth.middleware";

const router = Router();

router.post("/", [authMiddleware, isAdmin], createBookController);
router.post("/clone/:id", [authMiddleware, isAdmin], cloneBookController);
router.get("/", getBooksController);

export default router;
