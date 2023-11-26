import client, { dbName } from "../database/connection.js";
import CustomError from "../models/error.custom.js";

class BaseRepository {
  constructor(collectionName) {
    this.client = client;
    this.collection = client.db(dbName).collection(collectionName);
  }

  async create(data) {
    try {
      return (await this.collection.insertOne(data)).insertedId;
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async updateOne(filter, update, options = {}) {
    try {
      await this.collection.updateOne(filter, update, options);
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async count() {
    try {
      return await this.collection.countDocuments({});
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async findOne(obj) {
    try {
      return await this.collection.findOne(obj);
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async find(obj) {
    try {
      return await this.collection.find(obj).toArray();
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async getAll() {
    return await this.find({});
  }

  async getById(id) {
    return await this.findOne({ _id: id });
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }
}

export default BaseRepository;
