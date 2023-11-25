import { usersRepository } from "../repositories/users.repository.js";
import CustomError from "../models/error.custom.js";
import { verifyToken } from "../helpers/auth.helper.js";
import { calcRepository } from "../repositories/calc.repository.js";
import { toObjectId } from "../helpers/mongodb.helper.js";

class UsersService {
  async getUserById(token, id) {
    // Check is user authenticated
    verifyToken(token);
    const userId = toObjectId(id);

    const data = await usersRepository.getById(userId);

    if (!data) {
      throw new CustomError("User not found", 400);
    }

    delete data.password;

    return data;
  }

  async patchUser(token, data) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload._id);

    await usersRepository.patch(userId, data);
  }

  async deleteUser(token) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload._id);

    await usersRepository.deleteById(userId);
    await calcRepository.deleteById(userId);
  }
}

const usersService = new UsersService();
export { usersService };
