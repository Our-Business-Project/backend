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

  async update(_id, data) {
    await this.client.connect();
    const result = await this.collection.findOne({ _id });
    await this.collection.updateOne({ _id }, data);
    await this.client.close();

    return result.updatedId;
  }

  async getAll() {
    await this.client.connect();
    const rows = await this.collection.find({ _id }).toArray();
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
}

export default BaseRepository;
