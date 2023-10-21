import CustomError from "../models/error.custom.js";
import { usersRepository } from "../repositories/users.repository.js";

class AuthService {
  async register(data) {
    const { email, phone } = data;

    const resEmail = await usersRepository.findBy("email", email);
    if (resEmail)
      throw new CustomError("User with this email already exists!", 409);

    const resPhone = await usersRepository.findBy("phone", phone);
    if (resPhone)
      throw new CustomError("User with this phone already exists!", 409);

    const user = await usersRepository.create(data);

    if (!user) throw new CustomError("Registration failed", 400);

    return user;
  }

  async login(data) {
    // await
  }
}

const authService = new AuthService();
export { authService };
