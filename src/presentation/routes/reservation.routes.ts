import { Router } from "express";
import {
  createReservationController,
  getReservationsController,
  getMyReservationsController,
} from "@presentation/controllers/reservation.controller";
import { authMiddleware, isAdmin } from "@infra/middleware/auth.middleware";

const router = Router();

router.post("/", createReservationController);
router.get("/", [authMiddleware, isAdmin], getReservationsController);
router.get("/me", authMiddleware, getMyReservationsController);

export default router;
