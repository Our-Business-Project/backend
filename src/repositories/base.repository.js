import client, { dbName } from "../database/connection";

class BaseRepository {
  constructor(collectionName) {
    this.client = client;
    this.collection = client.db(dbName).collection(collectionName);
  }

  async create(data) {
    await this.client.connect();
    await this.collection.createIndex(data);
    await this.client.close();
  }

  async update(_id, data) {
    await this.client.connect();
    const row = await this.collection.findOne({ _id });
    await this.collection.updateOne({ _id }, data);
    await this.client.close();
  }

  async getAll() {
    await this.client.connect();
    const rows = await this.collection.find({ _id }).toArray();
    await this.client.close();

    return rows;
  }

  async getById(_id) {
    await this.client.connect();
    const row = await this.collection.findOne({ _id });
    await this.client.close();

    return row;
  }

  async count() {
    await this.client.connect();
    const num = await this.collection.countDocuments({});
    await this.client.close();

    return num;
  }
}

export default BaseRepository;
