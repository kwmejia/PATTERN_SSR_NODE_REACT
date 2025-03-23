import { Router } from "express";
import {
  loginController,
  logoutController,
  meController,
} from "@presentation/controllers/auth.controller";
import { authMiddleware } from "@infra/middleware/auth.middleware";

const router = Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.get('/me', authMiddleware, meController);
export default router;
