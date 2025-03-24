import { Router } from "express";
import {
  getLoginController,
  loginController,
  logoutController,
  meController,
} from "@presentation/controllers/auth.controller";
import { authMiddleware } from "@infra/middleware/auth.middleware";

const router = Router();

router.post("/login", loginController);
router.get('/login', getLoginController);
router.post("/logout", logoutController);
router.get('/me', authMiddleware, meController);
export default router;
