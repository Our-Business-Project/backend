import { ObjectId } from "mongodb";
import BaseRepository from "./base.repository.js";

class CalculationsRepository extends BaseRepository {
  constructor() {
    super("calculations");
  }

  async patch(id, data) {
    const updateObj = await super.getById(new ObjectId(id));

    for (const [key, value] of Object.entries(data)) {
      for (const [key2, value2] of Object.entries(data[key])) {
        if (value !== undefined && value2 !== undefined) {
          updateObj[key][key2] = value2;
        }
      }
    }

    try {
      await this.collection.updateOne({ _id: id }, { $set: updateObj });
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }
}

const calculationsRepository = new CalculationsRepository();
export { calculationsRepository };
