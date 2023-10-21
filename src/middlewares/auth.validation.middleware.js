import Joi from "joi";
import { validateRequired } from "../helpers/validation.helper.js";

const registerUserValidation = (req, _res, next) => {
  const obj = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+?3?8?(0\d{9})$/)
      .required(),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

export { registerUserValidation };
