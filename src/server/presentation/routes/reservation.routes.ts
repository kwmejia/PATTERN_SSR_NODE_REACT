import { Router } from "express";
import {
  createReservationController,
  getReservationsController,
  getMyReservationsController,
  getReservationsAdminController,
} from "@presentation/controllers/reservation.controller";
import { authMiddleware, isAdmin } from "@infra/middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createReservationController);
router.get("/", [authMiddleware, isAdmin], getReservationsController);
router.get("/me", authMiddleware, getMyReservationsController);
router.get("/admin",[authMiddleware, isAdmin], getReservationsAdminController);


export default router;
