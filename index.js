import express from "express";
import http from "http";
import dotenv from "dotenv";

import { initRoutes } from "./src/routes/index.js";
import { checkAppBeforeStart, gracefulShutdown } from "./src/appHelpers.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

checkAppBeforeStart();

const port = Number(process.env.LISTEN_PORT);

app.use(express.json());

initRoutes(app);

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on("SIGTERM", () => gracefulShutdown(server));
process.on("SIGINT", () => gracefulShutdown(server));

export { app, server };
