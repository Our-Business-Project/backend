import Joi from "joi";
import { validateRequired } from "../helpers/validation.helper.js";
import { phoneRegex, passwordRegex } from "../constants/regex.js";

const registerUserValidation = (req, _res, next) => {
  const obj = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phoneRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

const loginUserValidation = (req, _res, next) => {
  const obj = {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegex).required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

export { registerUserValidation, loginUserValidation };
