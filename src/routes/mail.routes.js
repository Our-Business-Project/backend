import { Router } from "express";
import { mailService } from "../mail/service.js";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { mailVerifyValidation } from "../middlewares/mail.validation.middleware.js";
import { parseToken } from "../helpers/auth.helper.js";

const router = Router();

router.post(
  "/send",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await mailService.sendVerificationMail(token);
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
      const token = parseToken(req.headers);
      const { token: mailToken } = req.body;
      const data = await mailService.verifyEmail(token, mailToken);

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
