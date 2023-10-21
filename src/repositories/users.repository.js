import jwt from "jsonwebtoken";
import BaseRepository from "./base.repository.js";
import CustomError from "../models/error.custom.js";

class UsersRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async checkDataNotExists(data) {
    const { email, phone } = data;
    await this.client.connect();
    const resEmail = await this.collection.findOne({ email });
    if (resEmail)
      throw new CustomError("User with this email already exists!", 409);

    const resPhone = await this.collection.findOne({ phone });
    if (resPhone)
      throw new CustomError("User with this phone already exists!", 409);

    await this.client.close();
  }

  async create(data) {
    try {
      const id = await super.create(data);
      const res = await super.getById(id);
      return {
        ...res,
        accessToken: jwt.sign({ id }, process.env.JWT_SECRET),
      };
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async findBy(property, value) {
    return await super.findBy(property, value);
  }
}

const usersRepository = new UsersRepository();
export { usersRepository };
