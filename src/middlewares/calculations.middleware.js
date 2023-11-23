import Joi from "joi";
import { validateRequired } from "../helpers/validation.helper.js";

const createCalculationValidation = (req, _res, next) => {
  const innerObject = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().required(),
    label: Joi.string().required(),
    borderRadius: Joi.string().optional(),
    disabled: Joi.boolean().optional(),
    slider: Joi.boolean().optional(),
    minValue: Joi.number().optional(),
    maxValue: Joi.number().optional(),
  }).required();

  const obj = {
    ProductionPlan: innerObject,
    CostPrice: innerObject,
    PricePerUnit: innerObject,
    GrossProfit: innerObject,
    ProductionCost: innerObject,
    FixedCosts: innerObject,
    Revenue: innerObject,
    BreakEvenPoint: innerObject,
    Profit: innerObject,
    Want: innerObject,
  };
  validateRequired(next, obj, req.body);

  next();
};

const updateCalculationValidation = (req, _res, next) => {
  const innerObject = Joi.object({
    name: Joi.string().optional(),
    value: Joi.number().optional(),
    label: Joi.string().optional(),
    borderRadius: Joi.string().optional(),
    disabled: Joi.boolean().optional(),
    slider: Joi.boolean().optional(),
    minValue: Joi.number().optional(),
    maxValue: Joi.number().optional(),
  });

  const obj = {
    ProductionPlan: innerObject,
    CostPrice: innerObject,
    PricePerUnit: innerObject,
    GrossProfit: innerObject,
    ProductionCost: innerObject,
    FixedCosts: innerObject,
    Revenue: innerObject,
    BreakEvenPoint: innerObject,
    Profit: innerObject,
    Want: innerObject,
  };
  validateRequired(next, obj, req.body);

  next();
};

export { createCalculationValidation, updateCalculationValidation };
