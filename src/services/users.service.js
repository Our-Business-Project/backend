import { ObjectId } from "mongodb";
import { usersRepository } from "../repositories/users.repository.js";
import CustomError from "../models/error.custom.js";
import { verifyToken } from "../helpers/auth.helper.js";

class UsersService {
  async getUserById(token, id) {
    // Check is user authenticated
    verifyToken(token);

    const data = await usersRepository.getById(new ObjectId(id));

    if (!data) {
      throw new CustomError("User not found", 400);
    }

    delete data.password;

    return data;
  }

  async patchUser(token, data) {
    const tokenPayload = verifyToken(token);

    await usersRepository.patch(new ObjectId(tokenPayload._id), data);
    const resData = await usersRepository.getById(
      new ObjectId(tokenPayload._id)
    );

    delete resData.password;

    return resData;
  }
}

const usersService = new UsersService();
export { usersService };
