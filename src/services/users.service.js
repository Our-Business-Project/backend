import { ObjectId } from "mongodb";
import { usersRepository } from "../repositories/users.repository.js";
import CustomError from "../models/error.custom.js";

class UsersService {
  async getUserById(id) {
    const data = await usersRepository.getById(new ObjectId(id));

    if (!data) {
      throw new CustomError("User not found", 401);
    }

    delete data.password;

    return data;
  }
}

const usersService = new UsersService();
export { usersService };
