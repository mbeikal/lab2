import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./db.js";
import airQualityRouter from "./routes/airQualityRoutes.js";
import waterQualityRouter from "./routes/waterQualityRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// ====== Middleware pipeline ======
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ====== Healthcheck ======
app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// ====== API v1 ======
app.use("/api/air-quality", airQualityRouter);
app.use("/api/water-quality", waterQualityRouter);

// ====== Errors ======
app.use(notFound);
app.use(errorHandler);

export default app;
