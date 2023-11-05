import { Router } from "express";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { usersService } from "../services/users.service.js";
import { parseTokenPayload } from "../helpers/auth.helper.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const tokenPayload = parseTokenPayload(next, req.headers);

      const data = await usersService.getUserById(tokenPayload, req.params.id);
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

export default router;
