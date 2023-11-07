import client, { dbName } from "../database/connection.js";

class BaseRepository {
  constructor(collectionName) {
    this.client = client;
    this.collection = client.db(dbName).collection(collectionName);
  }

  async create(data) {
    const result = await this.collection.insertOne(data);

    return result.insertedId;
  }

  async patch(id, data) {
    const updateObj = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateObj[key] = value;
      }
    }

    await this.collection.updateOne({ _id: id }, { $set: updateObj });
  }

  async getAll() {
    const rows = await this.collection.find({}).toArray();

    return rows;
  }

  async getById(_id) {
    const data = await this.collection.findOne({ _id });

    return data;
  }

  async count() {
    const num = await this.collection.countDocuments({});

    return num;
  }

  async findOne(obj) {
    const res = await this.collection.findOne(obj);

    return res;
  }

  async deleteById(id) {
    const res = await this.collection.deleteOne({ _id: id });
  }
}

export default BaseRepository;
