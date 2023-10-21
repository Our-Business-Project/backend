import express from "express";
import http from "http";
import dotenv from "dotenv";

import { initRoutes } from "./src/routes";
import { checkAppBeforeStart, gracefulShutdown } from "./appHelopers";

dotenv.config();

const app = express();

const server = http.createServer(app);

checkAppBeforeStart();

app.use(express.json());

initRoutes(app);

server.listen(process.env.LISTEN_PORT, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on("SIGTERM", () => gracefulShutdown(server));
process.on("SIGINT", () => gracefulShutdown(server));

export { app, server };
