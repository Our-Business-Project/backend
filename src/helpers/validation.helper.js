import Joi from "joi";
import CustomError from "../models/error.custom.js";

const validateRequired = (next, obj, params) => {
  const schema = Joi.object(obj).required();

  const { error } = schema.validate(params);

  if (error) {
    next(new CustomError(error.details[0].message, 400));
    return false;
  }

  return true;
};

export { validateRequired };
