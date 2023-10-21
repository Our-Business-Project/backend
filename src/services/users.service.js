import CustomError from "../models/error.custom.js";
import { usersRepository } from "../repositories/users.repository.js";

class UsersService {
  async createUser(data) {
    const user = await usersRepository.create(data);

    if (!user) throw new CustomError("User not created", 400);

    return user;
  }
}

const usersService = new UsersService();
export { usersService };
