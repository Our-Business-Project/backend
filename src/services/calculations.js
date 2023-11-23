import { calculationsRepository } from "../repositories/calculations.repository.js";
import CustomError from "../models/error.custom.js";
import { verifyToken } from "../helpers/auth.helper.js";
import { toObjectId } from "../helpers/mongodb.helper.js";

class CalculationsService {
  async getCalculationById(token, id) {
    const tokenPayload = verifyToken(token);

    const _id = toObjectId(id);
    const userId = toObjectId(tokenPayload._id);

    const data = await calculationsRepository.getById(_id);

    if (!data) {
      throw new CustomError("Calculation not found", 400);
    }

    if (!data.userId.equals(userId)) {
      throw new CustomError("Access denied!", 401);
    }

    delete data.userId;

    return data;
  }

  async createCalculation(token, data) {
    const tokenPayload = verifyToken(token);

    data.userId = toObjectId(tokenPayload._id);

    const id = await calculationsRepository.create(data);
    const res = await calculationsRepository.getById(id);

    delete res.userId;

    return res;
  }

  async patchCalculation(token, id, data) {
    // Check if data exists
    await this.getCalculationById(token, id);

    const calcId = toObjectId(id);

    await calculationsRepository.patch(calcId, data);
    const res = await calculationsRepository.getById(calcId);

    delete res.userId;

    return res;
  }

  async deleteCalculation(token, id) {
    // Check if data exists
    await this.getCalculationById(token, id);

    const _id = toObjectId(id);

    await calculationsRepository.deleteById(_id);
  }
}

const calculationsService = new CalculationsService();
export { calculationsService };
