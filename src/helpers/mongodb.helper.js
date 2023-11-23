import { ObjectId } from "mongodb";
import CustomError from "../models/error.custom.js";

export const toObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    return new ObjectId(id);
  } else {
    throw new CustomError("Invalid identificator", 400);
  }
};
