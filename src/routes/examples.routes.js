import { Router } from "express";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { calcDataExample } from "../examples/calcData.example.js";

const router = Router();

router.get(
  "/calc/data",
  async (_, res, next) => {
    try {
      res.locals.data = calcDataExample;
      res.locals.status = 200;

      next();
    } catch (error) {
      next(error);
    }
  },
  responseJsonMiddleware,
  errorJsonMiddleware
);

export default router;
