import { Router } from "express";
import { mailService } from "../mail/service.js";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { parseTokenPayload, verifyToken } from "../helpers/auth.helper.js";
import { mailVerifyValidation } from "../middlewares/mail.validation.middleware.js";

const router = Router();

router.post(
  "/send",
  async (req, res, next) => {
    try {
      const tokenPayload = parseTokenPayload(next, req.headers);

      const data = await mailService.sendVerificationMail(tokenPayload);
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
  "/verify",
  mailVerifyValidation,
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const tokenPayload = parseTokenPayload(next, req.headers);
      const tPayload = verifyToken(token);

      const data = await mailService.verifyEmail(tokenPayload, tPayload);

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
