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
      return res;
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async patch(id, data) {
    try {
      await super.patch(id, data);
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }
}

const usersRepository = new UsersRepository();
export { usersRepository };
