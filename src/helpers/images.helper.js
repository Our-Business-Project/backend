import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadImage = async (image, fileName) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await imagekit.upload({
        file: image,
        fileName: fileName,
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const deleteImage = async (imageId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await imagekit.deleteFile(imageId);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
