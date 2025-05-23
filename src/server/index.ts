import path from "path";
import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";

import cookieParser from "cookie-parser";

import { DatabaseSingleton } from "@infra/database/singleton-db";

import bookRoutes from "@presentation/routes/book.routes";
import userRoutes from "@presentation/routes/user.routes";
import authRoutes from "@presentation/routes/auth.routes";
import reservationRoutes from "@presentation/routes/reservation.routes";
import { redirectByRoleController } from "@presentation/controllers/redirect.controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/static", express.static(path.join(__dirname, "../../public/static")));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);
app.all("*", redirectByRoleController);

DatabaseSingleton.getInstance()
  .then(() => {
    app.get("/", (_req, res) => {
      res.send("Hello from backend with Singleton DB!");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to initialize DB:", err);
  });
