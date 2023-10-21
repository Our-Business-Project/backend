import jwt from "jsonwebtoken";
import CustomError from "../models/error.custom.js";

const parseTokenPayload = (next, headers) => {
  const tokenHeader = headers["authorization"];

  if (!tokenHeader) {
    next(new CustomError("Not Authorized", 401));
    return null;
  }

  const token = tokenHeader.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    next(new CustomError("Not Authorized", 401));
    return null;
  }
};

export { parseTokenPayload };
