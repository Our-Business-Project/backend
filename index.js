import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initRoutes } from "./src/routes/index.js";

dotenv.config({ path: "./prod.env" });

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 8000;

initRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export { app };
