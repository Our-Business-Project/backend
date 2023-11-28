import CustomError from "../models/error.custom.js";
import { usersRepository } from "../repositories/users.repository.js";
import {
  encodePassword,
  generateId,
  generateToken,
} from "../helpers/auth.helper.js";
import { mailService } from "../mail/service.js";
import { calcRepository } from "../repositories/calc.repository.js";

class AuthService {
  async register(data) {
    const { email, phone: phoneNumber, password } = data;

    const phone = phoneNumber.replace(/\D/g, "");

    const resEmail = await usersRepository.findOne({ email });
    if (resEmail)
      throw new CustomError("User with this email already exists!", 409);

    const resPhone = await usersRepository.findOne({ phone });
    if (resPhone)
      throw new CustomError("User with this phone already exists!", 409);

    data.phone = phone;
    data.password = encodePassword(password);
    data.taxation = "FOP";
    data.image = null;
    data.isEmailVerified = false;

    const user = await usersRepository.create(data);

    await calcRepository.create({
      _id: user._id,
      folders: [{ _id: generateId(), name: null, data: [] }],
    });

    if (!user) throw new CustomError("Registration failed", 400);

    user.id = user._id;
    delete user._id;
    delete user.password;

    const token = generateToken(user.id);

    await mailService.sendVerificationMail(token);

    return {
      user,
      accessToken: generateToken(user.id),
    };
  }

  async login(data) {
    const { emailOrPhone, password } = data;

    const hash = encodePassword(password);

    const user = await usersRepository.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) throw new CustomError("No such user exists", 400);

    if (user.password !== hash) {
      if (user.email == emailOrPhone)
        throw new CustomError("Invalid email/password", 400);
      else throw new CustomError("Invalid phone/password", 400);
    }

    user.id = user._id;
    delete user._id;
    delete user.password;

    return {
      user,
      accessToken: generateToken(user.id),
    };
  }
}

const authService = new AuthService();
export { authService };
