import { ObjectId } from "mongodb";
import { usersRepository } from "../repositories/users.repository.js";
import CustomError from "../models/error.custom.js";

class UsersService {
  async getProfile(tokenPayload) {
    const { _id } = tokenPayload;
    const data = await usersRepository.getById(new ObjectId(_id));

    if (!data) {
      throw new CustomError("Not Authorized", 401);
    }

    delete data.password;

    return data;
  }
}

const usersService = new UsersService();
export { usersService };
