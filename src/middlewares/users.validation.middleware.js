import Joi from "joi";

import { validateRequired } from "../helpers/validation.helper.js";

const updateUserValidation = (req, _res, next) => {
  const obj = {
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/),
    taxation: Joi.string().valid("NaturalPerson", "Yurosoba"),
  };
  validateRequired(next, obj, req.body);

  next();
};

export { updateUserValidation };
