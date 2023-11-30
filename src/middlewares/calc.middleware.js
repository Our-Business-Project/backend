import Joi from "joi";
import { validateRequired } from "../helpers/validation.helper.js";

const createCalcFolderValidation = (req, _res, next) => {
  const obj = {
    name: Joi.string().min(1).max(255).required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

const updateCalcFolderValidation = (req, _res, next) => {
  const obj = {
    name: Joi.string().min(1).max(255).required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

const createCalcDataValidation = (req, _res, next) => {
  const innerObject = Joi.object({
    value: Joi.number().required(),
    label: Joi.string().min(1).max(255).required(),
    borderRadius: Joi.string().min(1).max(255).optional(),
    disabled: Joi.boolean().optional(),
    slider: Joi.boolean().optional(),
    minValue: Joi.number().optional(),
    maxValue: Joi.number().optional(),
  }).required();

  const obj = {
    name: Joi.string().required(),
    data: Joi.object({
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
      DesiredProductionPlan: innerObject,
      DesiredCostPrice: innerObject,
      DesiredPricePerUnit: innerObject,
    }).required(),
    fixedCosts: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.number().required(),
          columnNames: Joi.array().items(Joi.string()).required(),
          data: Joi.array()
            .items(
              Joi.array()
                .items(Joi.alternatives().try(Joi.string(), Joi.number()))
                .length(Joi.ref("...columnNames.length"))
            )
            .required(),
        })
      )
      .required(),
  };
  validateRequired(next, obj, req.body);

  next();
};

const updateCalcDataValidation = (req, _res, next) => {
  const innerObject = Joi.object({
    value: Joi.number().optional(),
    label: Joi.string().min(1).max(255).optional(),
    borderRadius: Joi.string().min(1).max(255).optional(),
    disabled: Joi.boolean().optional(),
    slider: Joi.boolean().optional(),
    minValue: Joi.number().optional(),
    maxValue: Joi.number().optional(),
  });

  const obj = {
    name: Joi.string().optional(),
    data: Joi.object({
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
      DesiredProductionPlan: innerObject,
      DesiredCostPrice: innerObject,
      DesiredPricePerUnit: innerObject,
    }).optional(),
    fixedCosts: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.number().required(),
          columnNames: Joi.array().items(Joi.string()).required(),
          data: Joi.array()
            .items(
              Joi.array()
                .items(Joi.alternatives().try(Joi.string(), Joi.number()))
                .length(Joi.ref("...columnNames.length"))
            )
            .required(),
        })
      )
      .optional(),
  };
  validateRequired(next, obj, req.body);

  next();
};

export {
  createCalcFolderValidation,
  updateCalcFolderValidation,
  createCalcDataValidation,
  updateCalcDataValidation,
};
