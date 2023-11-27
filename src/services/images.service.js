import CustomError from "../models/error.custom.js";
import { usersRepository } from "../repositories/users.repository.js";
import { verifyToken } from "../helpers/auth.helper.js";
import { toObjectId } from "../helpers/mongodb.helper.js";
import { deleteImage, uploadImage } from "../helpers/images.helper.js";

class ImagesService {
  async uploadProfileImage(token, image) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);

    const userData = await usersRepository.getById(userId);

    if (!userData) {
      throw new CustomError("User not found", 400);
    }

    const fileName = `profile_${tokenPayload.id}.webp`;
    const imageResp = await uploadImage(image, fileName);

    const { fileId, url, thumbnailUrl } = imageResp;
    const resImageJson = { fileId, url, thumbnailUrl };

    const updatedData = { ...userData, image: resImageJson };

    await usersRepository.updateOne({ _id: userId }, { $set: updatedData });

    return resImageJson;
  }

  async deleteProfileImage(token) {
    const tokenPayload = verifyToken(token);
    const userId = toObjectId(tokenPayload.id);

    const userData = await usersRepository.getById(userId);

    if (!userData) {
      throw new CustomError("User not found", 400);
    }

    await deleteImage(userData.image.fileId);

    const updatedData = { ...userData, image: null };

    await usersRepository.updateOne({ _id: userId }, { $set: updatedData });
  }
}

const imagesService = new ImagesService();
export { imagesService };
