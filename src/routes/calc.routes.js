import { Router } from "express";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { calculationsService } from "../services/calculations.js";
import { parseToken } from "../helpers/auth.helper.js";
import {
  createCalculationValidation,
  updateCalculationValidation,
} from "../middlewares/calculations.middleware.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calculationsService.getCalculationById(
        token,
        req.params.id
      );
      res.locals.data = data;
      res.locals.status = 200;

      next();
    } catch (error) {
      next(error);
    }
  },
  responseJsonMiddleware,
  errorJsonMiddleware
);

router.post(
  "/",
  createCalculationValidation,
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calculationsService.createCalculation(token, req.body);
      res.locals.data = data;
      res.locals.status = 201;

      next();
    } catch (error) {
      next(error);
    }
  },
  responseJsonMiddleware,
  errorJsonMiddleware
);

router.patch(
  "/:id",
  updateCalculationValidation,
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calculationsService.patchCalculation(
        token,
        req.params.id,
        req.body
      );
      res.locals.data = data;
      res.locals.status = 200;

      next();
    } catch (error) {
      next(error);
    }
  },
  responseJsonMiddleware,
  errorJsonMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      await calculationsService.deleteCalculation(token, req.params.id);

      res.locals.data = "ok";
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
