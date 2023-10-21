import express from "express";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";

import { initRoutes } from "./src/routes/index.js";
import { checkAppBeforeStart, gracefulShutdown } from "./src/appHelpers.js";

dotenv.config();

const app = express();

const httpsOptions = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.crt"),
};
const server = https.createServer(httpsOptions, app);

checkAppBeforeStart();

const port = Number(process.env.LISTEN_PORT);

app.use(express.json());

initRoutes(app);

server.listen(port, () => {
  console.log(`App listening at https://localhost:${port}`);
});

process.on("SIGTERM", () => gracefulShutdown(server));
process.on("SIGINT", () => gracefulShutdown(server));

export { app, server };
