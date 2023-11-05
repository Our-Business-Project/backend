import Joi from "joi";
import { validateRequired } from "../helpers/validation.helper.js";

const mailVerifyValidation = (req, _res, next) => {
  const obj = {
    token: Joi.string()
      .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
      .required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

export { mailVerifyValidation };
