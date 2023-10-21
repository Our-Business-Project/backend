import Joi from "joi";

import { validateRequired } from "../helpers/validation.helper.js";
import { parseTokenPayload } from "../helpers/auth.helper.js";
import CustomError from "../models/error.custom.js";

const getUserByIdValidation = (req, _res, next) => {
  const obj = {
    id: Joi.string().uuid(),
  };
  validateRequired(next, obj, req.params);

  next();
};

const updateUserValidation = (req, _res, next) => {
  const params = {
    id: Joi.string().uuid(),
  };
  const isVal = validateRequired(next, params, req.params);
  if (!isVal) return;

  const obj = {
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/),
  };
  const isValid = validateRequired(next, obj, req.body);
  if (!isValid) return;

  const tokenPayload = parseTokenPayload(next, req.headers);
  if (!tokenPayload) return;

  if (req.params.id !== tokenPayload.id) {
    next(new CustomError("UserId mismatch", 401));
    return;
  }

  next();
};

export { getUserByIdValidation, updateUserValidation };
