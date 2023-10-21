import jwt from "jsonwebtoken";
import BaseRepository from "./base.repository.js";
import CustomError from "../models/error.custom.js";

class UsersRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async create(data) {
    try {
      const id = await super.create(data);
      const res = await super.getById(id);
      return {
        ...res,
        accessToken: jwt.sign({ id }, process.env.JWT_SECRET),
      };
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }
}

const usersRepository = new UsersRepository();
export { usersRepository };
