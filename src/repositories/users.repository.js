import BaseRepository from "./base.repository.js";

class UsersRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async create(data) {
    const id = await super.create(data);
    const res = await super.getById(id);
    return res;
  }
}

const usersRepository = new UsersRepository();
export { usersRepository };
