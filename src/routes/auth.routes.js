import { Router } from "express";
import { registerUserValidation } from "../middlewares/auth.validation.middleware.js";
import { authService } from "../services/auth.service.js";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";

const router = Router();

router.post(
  "/",
  registerUserValidation,
  async (req, res, next) => {
    try {
      const data = await authService.register(req.body);
      res.locals.data = data;
      next();
    } catch (error) {
      next(error);
    }
  },
  responseJsonMiddleware,
  errorJsonMiddleware
);

export default router;
