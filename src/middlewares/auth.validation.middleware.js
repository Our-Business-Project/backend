import Joi from "joi";
import { validateRequired } from "../helpers/validation.helper.js";
import { phoneRegex, passwordRegex } from "../constants/regex.js";

const registerUserValidation = (req, _res, next) => {
  const obj = {
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phoneRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

const loginUserValidation = (req, _res, next) => {
  const obj = {
    emailOrPhone: Joi.alternatives()
      .try(Joi.string().email(), Joi.string().pattern(phoneRegex))
      .required(),
    password: Joi.string().pattern(passwordRegex).required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

export { registerUserValidation, loginUserValidation };
