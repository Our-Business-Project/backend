import { ObjectId } from "mongodb";
import { usersRepository } from "../repositories/users.repository.js";
import CustomError from "../models/error.custom.js";

class UsersService {
  async getUserById(tokenPayload, id) {
    if (!tokenPayload) {
      throw new CustomError("Not Authorized", 401);
    }

    const data = await usersRepository.getById(new ObjectId(id));

    if (!data) {
      throw new CustomError("User not found", 400);
    }

    delete data.password;

    return data;
  }
}

const usersService = new UsersService();
export { usersService };
