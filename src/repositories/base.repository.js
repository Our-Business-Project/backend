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

  async patch(id, data) {
    const updateObj = {};

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updateObj[key] = value;
      }
    }

    try {
      await this.collection.updateOne({ _id: id }, { $set: updateObj });
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async getAll() {
    try {
      return await this.collection.find({}).toArray();
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }

  async getById(id) {
    try {
      return await this.collection.findOne({ _id: id });
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

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });
    } catch (err) {
      throw new CustomError(err, 500);
    }
  }
}

export default BaseRepository;
