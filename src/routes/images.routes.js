import { Router } from "express";
import multer from "multer";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { imagesService } from "../services/images.service.js";
import { parseToken } from "../helpers/auth.helper.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/profile",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await imagesService.uploadProfileImage(
        token,
        req.file.buffer
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
  "/profile",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      await imagesService.deleteProfileImage(token);

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
