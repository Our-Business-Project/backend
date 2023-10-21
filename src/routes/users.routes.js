import { Router } from "express";
import { createUserValidation } from "../middlewares/users.validation.middleware.js";
import { usersService } from "../services/users.service.js";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";

const router = Router();

router.post(
  "/",
  createUserValidation,
  async (req, res, next) => {
    try {
      const data = await usersService.createUser(req.body);
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
