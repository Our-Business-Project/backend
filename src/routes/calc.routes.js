import { Router } from "express";
import { responseJsonMiddleware } from "../middlewares/response.json.middleware.js";
import { errorJsonMiddleware } from "../middlewares/error.json.middleware.js";
import { calcService } from "../services/calc.service.js";
import { parseToken } from "../helpers/auth.helper.js";
import {
  createCalcFolderValidation,
  updateCalcFolderValidation,
  createCalcDataValidation,
  updateCalcDataValidation,
} from "../middlewares/calc.middleware.js";

const router = Router();

router.get(
  "/folders/:folderId/data/:dataId",
  async (req, res, next) => {
    try {
      const { folderId, dataId } = req.params;
      const token = parseToken(req.headers);
      const data = await calcService.getCalculation(token, folderId, dataId);
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

router.patch(
  "/folders/:folderId/data/:dataId",
  updateCalcDataValidation,
  async (req, res, next) => {
    try {
      const { folderId, dataId } = req.params;
      const token = parseToken(req.headers);
      const data = await calcService.patchCalculation(
        token,
        folderId,
        dataId,
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
  "/folders/:folderId/data/:dataId",
  async (req, res, next) => {
    try {
      const { folderId, dataId } = req.params;
      const token = parseToken(req.headers);
      await calcService.deleteCalculation(token, folderId, dataId);

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

router.post(
  "/folders/:folderId/data",
  createCalcDataValidation,
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calcService.createCalculation(
        token,
        req.params.folderId,
        req.body
      );
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

router.get(
  "/folders/:id",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calcService.getFolder(token, req.params.id);
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

router.patch(
  "/folders/:id",
  updateCalcFolderValidation,
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calcService.updateFolderName(
        token,
        req.params.id,
        req.body.name
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
  "/folders/:id",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      await calcService.deleteFolder(token, req.params.id);

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

router.get(
  "/folders",
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calcService.getFolders(token);
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
  "/folders",
  createCalcFolderValidation,
  async (req, res, next) => {
    try {
      const token = parseToken(req.headers);
      const data = await calcService.createFolder(token, req.body);
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

// router.get(
//   "/",
//   async (req, res, next) => {
//     try {
//       const token = parseToken(req.headers);
//       const data = await calcService.getUserCalculations(token);
//       res.locals.data = data;
//       res.locals.status = 200;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   responseJsonMiddleware,
//   errorJsonMiddleware
// );

// router.post(
//   "/",
//   createCalcValidation,
//   async (req, res, next) => {
//     try {
//       const token = parseToken(req.headers);
//       const data = await calcService.createCalculation(token, req.body);
//       res.locals.data = data;
//       res.locals.status = 201;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   responseJsonMiddleware,
//   errorJsonMiddleware
// );

// router.get(
//   "/:id",
//   async (req, res, next) => {
//     try {
//       const token = parseToken(req.headers);
//       const data = await calcService.getCalculationById(token, req.params.id);
//       res.locals.data = data;
//       res.locals.status = 200;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   responseJsonMiddleware,
//   errorJsonMiddleware
// );

// router.patch(
//   "/:id",
//   updateCalcValidation,
//   async (req, res, next) => {
//     try {
//       const token = parseToken(req.headers);
//       const data = await calcService.patchCalculation(
//         token,
//         req.params.id,
//         req.body
//       );
//       res.locals.data = data;
//       res.locals.status = 200;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   responseJsonMiddleware,
//   errorJsonMiddleware
// );

// router.delete(
//   "/:id",
//   async (req, res, next) => {
//     try {
//       const token = parseToken(req.headers);
//       await calcService.deleteCalculation(token, req.params.id);

//       res.locals.data = "ok";
//       res.locals.status = 200;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   responseJsonMiddleware,
//   errorJsonMiddleware
// );

export default router;
