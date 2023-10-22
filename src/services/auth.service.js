import jwt from "jsonwebtoken";
import CustomError from "../models/error.custom.js";
import { usersRepository } from "../repositories/users.repository.js";
import { encodePassword } from "../helpers/auth.helper.js";

class AuthService {
  async register(data) {
    const { email, phone, password } = data;

    const resEmail = await usersRepository.findOne({ email });
    if (resEmail)
      throw new CustomError("User with this email already exists!", 409);

    const resPhone = await usersRepository.findOne({ phone });
    if (resPhone)
      throw new CustomError("User with this phone already exists!", 409);

    data.password = encodePassword(password);

    const user = await usersRepository.create(data);

    if (!user) throw new CustomError("Registration failed", 400);

    delete user.password;

    return {
      ...user,
      accessToken: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
    };
  }

  async login(data) {
    const { email, password } = data;

    const hash = encodePassword(password);

    const user = await usersRepository.findOne({ email, password: hash });

    if (!user) throw new CustomError("Invalid email/password", 400);

    delete user.password;

    return {
      ...user,
      accessToken: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
    };
  }
}

const authService = new AuthService();
export { authService };
