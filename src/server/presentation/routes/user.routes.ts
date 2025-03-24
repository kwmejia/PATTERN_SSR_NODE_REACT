import { Router } from "express";
import {
  createUserController,
  getDashboardUserController,
  getRegisterController,
  getUsersController,
} from "@presentation/controllers/user.controller";
import { authMiddleware } from "@infra/middleware/auth.middleware";

const router = Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.get("/dashboard", [authMiddleware], getDashboardUserController);
router.get("/register", getRegisterController);

export default router;
