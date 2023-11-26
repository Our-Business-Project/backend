import Joi from "joi";

import { validateRequired } from "../helpers/validation.helper.js";

const updateUserValidation = (req, _res, next) => {
  const obj = {
    firstName: Joi.string()
      .min(2)
      .max(255)
      .pattern(/^[a-zA-Zа-яА-Я\-]+$/),
    lastName: Joi.string()
      .min(2)
      .max(255)
      .pattern(/^[a-zA-Zа-яА-Я\-]+$/),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/),
    taxation: Joi.string().valid("NaturalPerson", "Yurosoba"),
  };
  validateRequired(next, obj, req.body);

  next();
};

export { updateUserValidation };
