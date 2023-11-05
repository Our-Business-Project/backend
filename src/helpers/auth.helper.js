import md5 from "md5";
import jwt from "jsonwebtoken";
import CustomError from "../models/error.custom.js";

const jwtSecret = process.env.JWT_SECRET;

const encodePassword = (password) => {
  return md5(password);
};

const generateToken = (_id, expiresIn = "24h") => {
  return jwt.sign({ _id }, jwtSecret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

const parseTokenPayload = (next, headers) => {
  const tokenHeader = headers["authorization"];

  if (!tokenHeader) {
    next(new CustomError("Not Authorized", 401));
    return null;
  }

  const token = tokenHeader.replace("Bearer ", "");
  try {
    return verifyToken(token);
  } catch (error) {
    next(new CustomError("Not Authorized", 401));
    return null;
  }
};

export { encodePassword, generateToken, verifyToken, parseTokenPayload };
