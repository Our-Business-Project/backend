import { calcRepository } from "../repositories/calc.repository.js";
import CustomError from "../models/error.custom.js";
import { generateId, verifyToken } from "../helpers/auth.helper.js";
import { toObjectId } from "../helpers/mongodb.helper.js";
import { getCurrentTime } from "../helpers/datetime.helper.js";

class CalcService {
  async getFolders(token) {
    const tokenPayload = verifyToken(token);

    const userId = toObjectId(tokenPayload.id);

    const data = await calcRepository.findOne({ _id: userId });

    const folders = data ? data.folders : [];

    folders.forEach((folder) => {
      folder.numberOfFiles = folder.data.length;
      folder.id = folder._id;
      delete folder._id;
      delete folder.data;
    });

    return folders;
  }

  async getFullFolderData(token, folderId) {
    const tokenPayload = verifyToken(token);

    const userId = toObjectId(tokenPayload.id);
    const fId = toObjectId(folderId);

    const folder = await calcRepository.findFolder(userId, fId);

    if (!folder)
      throw new CustomError(
        `Folder with id "${folderId}" doesn't exists!`,
        400
      );

    return folder;
  }

  async getFolder(token, folderId) {
    const folder = await this.getFullFolderData(token, folderId);

    folder.id = folder._id;
    delete folder._id;

    folder.data.forEach((calc) => {
      calc.id = calc._id;
      delete calc._id;
      delete calc.data;
      delete calc.fixedCosts;
    });
    return folder;
  }

  async createFolder(token, folderData) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);

    const createdAt = getCurrentTime();

    const newFolder = { _id: generateId(), ...folderData, data: [], createdAt };

    const userData = await calcRepository.findOne({ _id: userId });

    const userFolder = userData
      ? userData.folders.find((folder) => folder.name === folderData.name)
      : null;

    if (userFolder)
      throw new CustomError(
        `Folder with name "${folderData.name}" already exists!`,
        400
      );

    await calcRepository.updateOne(
      { _id: userId },
      { $push: { folders: newFolder } }
    );

    newFolder.id = newFolder._id;
    delete newFolder._id;
    delete newFolder.data;

    return newFolder;
  }

  async updateFolderName(token, folderId, folderName) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);
    const fId = toObjectId(folderId);

    const modifiedAt = getCurrentTime();

    const folder = await this.getFullFolderData(token, folderId);

    if (folder.name === null) {
      throw new CustomError(`You can't change root folder name!`, 400);
    }

    if (folder.name === folderName) {
      throw new CustomError(
        `Your new folder name is same as current one!`,
        400
      );
    }

    await calcRepository.updateOne(
      { _id: userId, "folders._id": fId },
      {
        $set: {
          "folders.$.name": folderName,
          "folders.$.modifiedAt": modifiedAt,
        },
      }
    );

    return {
      id: folder._id,
      name: folderName,
      modifiedAt,
    };
  }

  async deleteFolder(token, folderId) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);
    const fId = toObjectId(folderId);

    const folder = await this.getFullFolderData(token, folderId);

    if (folder.name === null) {
      throw new CustomError(`You can't delete root folder!`, 400);
    }

    await calcRepository.updateOne(
      { _id: userId },
      { $pull: { folders: { _id: fId } } }
    );
  }

  async getFullCalculation(token, folderId, calcId) {
    const cId = toObjectId(calcId);

    const folder = await this.getFullFolderData(token, folderId);
    const calcData = folder.data.find((calc) => calc._id.equals(cId));

    if (!calcData)
      throw new CustomError(
        `Calculation with id "${calcId}" doesn't exists!`,
        400
      );

    return calcData;
  }

  async getCalculation(token, folderId, calcId) {
    const calcData = await this.getFullCalculation(token, folderId, calcId);
    calcData.id = calcData._id;
    delete calcData._id;
    calcData.parentFolderId = folderId;

    return calcData;
  }

  async createCalculation(token, folderId, data) {
    const tokenPayload = verifyToken(token);

    const userId = toObjectId(tokenPayload.id);
    const fId = toObjectId(folderId);

    const userFolder = await this.getFullFolderData(token, folderId);

    const userCalcData = userFolder
      ? userFolder.data.find((item) => item.name === data.name)
      : null;

    if (userCalcData)
      throw new CustomError(
        `Calculation with name "${userCalcData.name}" already exists!`,
        400
      );

    const createdAt = getCurrentTime();

    const newData = { _id: generateId(), ...data, createdAt };

    await calcRepository.updateOne(
      { _id: userId, "folders._id": fId },
      { $push: { "folders.$.data": newData } }
    );

    newData.id = newData._id;
    delete newData._id;

    return newData;
  }

  async patchCalculation(token, folderId, calcId, data) {
    const { data: calcData, fixedCosts, ...restData } = data;
    const tokenPayload = verifyToken(token);

    const userId = toObjectId(tokenPayload.id);
    const fId = toObjectId(folderId);
    const cId = toObjectId(calcId);

    const userCalcData = await this.getFullCalculation(token, folderId, calcId);

    const modifiedAt = getCurrentTime();

    const updatedData = {
      ...userCalcData,
      ...restData,
      data: { ...userCalcData.data, ...calcData },
      fixedCosts: fixedCosts ? fixedCosts : userCalcData.fixedCosts,
      modifiedAt,
    };

    await calcRepository.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          "folders.$[folder].data.$[calc]": updatedData,
        },
      },
      {
        arrayFilters: [{ "folder._id": fId }, { "calc._id": cId }],
      }
    );

    updatedData.id = updatedData._id;
    delete updatedData._id;

    updatedData.fixedCosts.forEach((item) => {
      item.id = item._id;
      delete item._id;
      item.data.forEach((elem) => {
        elem.id = elem._id;
        delete elem._id;
      });
    });

    return updatedData;
  }

  async deleteCalculation(token, folderId, calcId) {
    const tokenPayload = verifyToken(token);

    const userId = toObjectId(tokenPayload.id);
    const fId = toObjectId(folderId);
    const cId = toObjectId(calcId);

    await calcRepository.updateOne(
      {
        _id: userId,
        "folders._id": fId,
      },
      {
        $pull: {
          "folders.$[folder].data": { _id: cId },
        },
      },
      {
        arrayFilters: [{ "folder._id": fId }],
      }
    );
  }
}

const calcService = new CalcService();
export { calcService };
