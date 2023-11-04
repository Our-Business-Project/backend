import md5 from "md5";
import jwt from "jsonwebtoken";
import CustomError from "../models/error.custom.js";

const jwtSecret = process.env.JWT_SECRET;

const encodePassword = (password) => {
  return md5(password);
};

const generateToken = (_id) => {
  return jwt.sign({ _id }, jwtSecret, { expiresIn: "24h" });
};

const parseTokenPayload = (next, headers) => {
  const tokenHeader = headers["authorization"];

  if (!tokenHeader) {
    next(new CustomError("Not Authorized", 401));
    return null;
  }

  const token = tokenHeader.replace("Bearer ", "");
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    next(new CustomError("Not Authorized", 401));
    return null;
  }
};

export { encodePassword, generateToken, parseTokenPayload };
