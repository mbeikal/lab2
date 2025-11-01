import { config } from "dotenv";
config();
import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`HTTP сервер запущен на порту ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Получен SIGINT. Завершение...");
  process.exit(0);
});
