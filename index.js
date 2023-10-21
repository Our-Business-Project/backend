import express from "express";
import dotenv from "dotenv";

import { initRoutes } from "./src/routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

initRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export { app };
