import client, { dbName } from "../database/connection.js";

class BaseRepository {
  constructor(collectionName) {
    this.client = client;
    this.collection = client.db(dbName).collection(collectionName);
  }

  async create(data) {
    await this.client.connect();
    const result = await this.collection.insertOne(data);
    await this.client.close();

    return result.insertedId;
  }

  async patch(id, data) {
    const updateObj = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateObj[key] = value;
      }
    }

    await this.client.connect();
    const result = await this.collection.updateOne(
      { _id: id },
      { $set: updateObj }
    );
    await this.client.close();
  }

  async getAll() {
    await this.client.connect();
    const rows = await this.collection.find({}).toArray();
    await this.client.close();

    return rows;
  }

  async getById(_id) {
    await this.client.connect();
    const data = await this.collection.findOne({ _id });
    await this.client.close();

    return data;
  }

  async count() {
    await this.client.connect();
    const num = await this.collection.countDocuments({});
    await this.client.close();

    return num;
  }

  async findOne(obj) {
    await this.client.connect();
    const res = await this.collection.findOne(obj);
    await this.client.close();

    return res;
  }
}

export default BaseRepository;
