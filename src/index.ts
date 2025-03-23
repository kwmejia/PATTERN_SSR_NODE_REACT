import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";

import cookieParser from "cookie-parser";

import { DatabaseSingleton } from "@infra/database/singleton-db";
import bookRoutes from "@presentation/routes/book.routes";
import userRoutes from "@presentation/routes/user.routes";
import reservationRoutes from "@presentation/routes/reservation.routes";
import authRoutes from "@presentation/routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);

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
