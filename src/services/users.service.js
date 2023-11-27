import { usersRepository } from "../repositories/users.repository.js";
import CustomError from "../models/error.custom.js";
import { verifyToken } from "../helpers/auth.helper.js";
import { calcRepository } from "../repositories/calc.repository.js";
import { toObjectId } from "../helpers/mongodb.helper.js";

class UsersService {
  async getFullUserData(token, id) {
    // Check is user authenticated
    verifyToken(token);
    const userId = toObjectId(id);

    const data = await usersRepository.getById(userId);

    if (!data) {
      throw new CustomError("User not found", 400);
    }

    return data;
  }

  async getUserById(token, id) {
    const data = await this.getFullUserData(token, id);

    data.id = data._id;
    delete data._id;
    delete data.password;

    return data;
  }

  async patchUser(token, data) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);
    const userData = await this.getFullUserData(token, tokenPayload.id);

    const updatedData = { ...userData, ...data };

    await usersRepository.updateOne({ _id: userId }, { $set: updatedData });

    data.id = data._id;
    delete data._id;
    delete updatedData.password;

    return updatedData;
  }

  async deleteUser(token) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);

    await usersRepository.deleteById(userId);
    await calcRepository.deleteById(userId);
  }
}

const usersService = new UsersService();
export { usersService };
