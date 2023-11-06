import { Router } from "express";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { usersService } from "../services/users.service.js";
import { parseToken } from "../helpers/auth.helper.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await usersService.getUserById(token, req.params.id);
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
  "/",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      await usersService.deleteUser(token);

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
