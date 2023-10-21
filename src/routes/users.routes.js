import { Router } from "express";
import { createUserValidation } from "../middlewares/users.validation.middleware.js";
import { usersService } from "../services/users.service.js";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    console.log("Hello");
    next();
  },
  responseJsonMiddleware
);

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
  responseJsonMiddleware
);

export default router;
