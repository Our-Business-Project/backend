import md5 from "md5";
import jwt from "jsonwebtoken";
import CustomError from "../models/error.custom.js";
import { ObjectId } from "mongodb";

const jwtSecret = process.env.JWT_SECRET;

const encodePassword = (password) => {
  return md5(password);
};

const generateId = () => {
  return new ObjectId();
};

const generateToken = (_id, expiresIn = "24h") => {
  return jwt.sign({ _id }, jwtSecret, { expiresIn });
};

const verifyToken = (token, err = new CustomError("Not Authorized", 401)) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw err;
  }
};

const parseToken = (headers) => {
  const tokenHeader = headers["authorization"];

  if (!tokenHeader) {
    throw new CustomError("Not Authorized", 401);
  }

  return tokenHeader.replace("Bearer ", "");
};

export { encodePassword, generateId, generateToken, verifyToken, parseToken };
